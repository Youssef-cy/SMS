package com.Company.SMS.Service;

import com.Company.SMS.DTO.Attendance.AttendanceChartRES;
import com.Company.SMS.DTO.Request.AttendanceEntryRequest;
import com.Company.SMS.DTO.Request.SaveAttendanceRequest;
import com.Company.SMS.DTO.Response.*;
import com.Company.SMS.Repo.*;
import com.Company.SMS.entities.Attendance;
import com.Company.SMS.entities.Class;
import com.Company.SMS.entities.Session;
import com.Company.SMS.entities.Student;
import com.Company.SMS.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AttendanceService {

    @Autowired
    AttendanceRepo attendanceRepo;
    
    @Autowired
    ClassRepo classRepository;
    
    @Autowired
    StudentRepo studentRepository;
    
    @Autowired
    SessionsRepo sessionRepository;

    public List<Attendance> getTodayAbsence() {
        int dayOfWeek = LocalDate.now().getDayOfWeek().getValue();
        return attendanceRepo.getTodayAbsence(dayOfWeek);
    }

    public Long getAttendanceStats(){
       return attendanceRepo.getAttendanceStats();
    }

    public List<AttendanceChartRES> getAttendanceChart(){
        return attendanceRepo.getAbsentStudentsByDay();
    }

    public Double getTodayAttendance() {
        LocalDate today = LocalDate.now();
        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end = today.plusDays(1).atStartOfDay();
        return (double) attendanceRepo.countByDateBetween(start, end);
    }

    @Transactional(readOnly = true)
    public StudentHistoryResponse getStudentHistory(Long studentId, LocalDate date) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));

        List<Attendance> records = attendanceRepo.findByStudentId(studentId);

        Map<LocalDate, List<Attendance>> recordsByDate = records.stream()
                .filter(a -> a.getDateTime() != null)
                .collect(Collectors.groupingBy(a -> a.getDateTime().toLocalDate()));

        int presentDays = 0;
        int absentDays = 0;
        int lateDays = 0;
        int excusedDays = 0;

        List<StudentHistoryDay> historyDays = new ArrayList<>();

        for (Map.Entry<LocalDate, List<Attendance>> entry : recordsByDate.entrySet()) {
            LocalDate day = entry.getKey();
            List<Attendance> dayRecords = entry.getValue();

            List<Character> statuses = dayRecords.stream()
                    .map(Attendance::getStatus)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());

            if (statuses.isEmpty()) {
                continue;
            }

            String consolidatedStatus;
            if (statuses.contains('P')) {
                consolidatedStatus = "P";
                presentDays++;
            } else if (statuses.contains('L')) {
                consolidatedStatus = "L";
                lateDays++;
            } else if (statuses.stream().allMatch(s -> s == 'E')) {
                consolidatedStatus = "E";
                excusedDays++;
            } else {
                consolidatedStatus = "A";
                absentDays++;
            }

            historyDays.add(new StudentHistoryDay(day, consolidatedStatus));
        }

        historyDays.sort(Comparator.comparing(StudentHistoryDay::getDate));

        int totalDays = presentDays + absentDays + lateDays + excusedDays;
        double rate = totalDays == 0 ? 0.0 : Math.round(((double) presentDays / totalDays) * 100.0);

        StudentHistoryResponse.Stats stats = new StudentHistoryResponse.Stats();
        stats.setPresent(presentDays);
        stats.setAbsent(absentDays);
        stats.setLate(lateDays);
        stats.setExcused(excusedDays);
        
        StudentHistoryResponse res = new StudentHistoryResponse();
        res.setAttendanceRate(rate);
        res.setRecordedDays((long) totalDays);
        res.setStats(stats);
        res.setHistoryDays(historyDays);
        return res;
    }

    public Long getTodayAbsenceCount() {
        LocalDate today = LocalDate.now();
        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end = today.plusDays(1).atStartOfDay();
        return attendanceRepo.countAbsenceByDateBetween(start, end);
    }

    public List<Long> getWeeklyAttendanceCounts(int weeks) {
        List<Long> result = new ArrayList<>();
        LocalDate weekStart = LocalDate.now().with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate firstWeekStart = weekStart.minusWeeks(weeks - 1);
        for (int i = 0; i < weeks; i++) {
            LocalDate wStart = firstWeekStart.plusWeeks(i);
            LocalDate wEnd = wStart.plusWeeks(1);
            long count = attendanceRepo.countByWeek(
                    wStart.atStartOfDay(),
                    wEnd.atStartOfDay()
            );
            result.add(count);
        }
        return result;
    }

    public List<String> getWeeklyLabels(int weeks) {
        List<String> labels = new ArrayList<>();
        LocalDate weekStart = LocalDate.now().with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate firstWeekStart = weekStart.minusWeeks(weeks - 1);
        for (int i = 0; i < weeks; i++) {
            LocalDate wStart = firstWeekStart.plusWeeks(i);
            String monthAbbr = wStart.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
            labels.add(monthAbbr + " " + wStart.getDayOfMonth());
        }
        return labels;
    }

    public List<Object[]> getAbsenceByGrade() {
        return attendanceRepo.countAbsenceByGrade();
    }

    @Transactional(readOnly = true)
    public AttendanceGridResponse getAttendanceGrid(Long classId, LocalDate date) {
        Class classRoom = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found with id: " + classId));

        List<Student> students = studentRepository.findByStudentClassIdOrderByUserFirstNameAsc(classId);

        long dayOfWeekValue = date.getDayOfWeek().getValue(); 

        List<Session> sessions = sessionRepository
                .findByClassField_IdAndDayOfWeekOrderByStartAtAsc(classId, dayOfWeekValue);

        LocalDateTime dayStart = date.atStartOfDay();
        LocalDateTime dayEnd = date.plusDays(1).atStartOfDay();

        List<Attendance> existingRecords =
                attendanceRepo.findGridByClassAndDate(classId, dayStart, dayEnd);

        Map<String, Attendance> recordIndex = existingRecords.stream()
                .filter(a -> a.getSession() != null)
                .collect(Collectors.toMap(
                        a -> a.getStudent().getStudent_id() + "_" + a.getSession().getId(),
                        a -> a,
                        (a, b) -> a
                ));

        List<StudentAttendanceRowResponse> rows = new ArrayList<>();
        for (Student student : students) {
            List<SessionAttendanceResponse> sessionResponses = new ArrayList<>();
            for (int i = 0; i < sessions.size(); i++) {
                Session session = sessions.get(i);
                String key = student.getStudent_id() + "_" + session.getId();
                Attendance existing = recordIndex.get(key);
                
                SessionAttendanceResponse sRes = new SessionAttendanceResponse();
                sRes.setSessionId(session.getId());
                sRes.setPeriodNumber(i + 1);
                sRes.setCourseName(session.getCourse().getCourseName());
                sRes.setStartAt(session.getStartAt());
                sRes.setEndAt(session.getEndAt());
                sRes.setStatus(existing != null ? existing.getStatus() : null);
                
                sessionResponses.add(sRes);
            }

            StudentAttendanceRowResponse sRow = new StudentAttendanceRowResponse();
            sRow.setStudentId(student.getStudent_id());
            sRow.setFullName(buildFullName(student));
            sRow.setInitials(buildInitials(student));
            sRow.setClassName(classRoom.getName());
            sRow.setSessions(sessionResponses);
            
            rows.add(sRow);
        }

        List<SessionAttendanceResponse> sessionHeaders = new ArrayList<>();
        for (int i = 0; i < sessions.size(); i++) {
            Session s = sessions.get(i);
            SessionAttendanceResponse sHeader = new SessionAttendanceResponse();
            sHeader.setSessionId(s.getId());
            sHeader.setPeriodNumber(i + 1);
            sHeader.setCourseName(s.getCourse().getCourseName());
            sHeader.setStartAt(s.getStartAt());
            sHeader.setEndAt(s.getEndAt());
            sHeader.setStatus(null);
            sessionHeaders.add(sHeader);
        }

        AttendanceGridResponse grid = new AttendanceGridResponse();
        grid.setClassId(classRoom.getId());
        grid.setClassName(classRoom.getName());
        grid.setDate(date);
        grid.setStudentCount(students.size());
        grid.setSessions(sessionHeaders);
        grid.setRows(rows);
        return grid;
    }

    @Transactional
    public AttendanceGridResponse saveAttendance(SaveAttendanceRequest request) {
        Class classRoom = classRepository.findById(request.getClassId())
                .orElseThrow(() -> new RuntimeException("Class not found with id: " + request.getClassId()));

        long dayOfWeekValue = request.getDate().getDayOfWeek().getValue();
        Map<Long, Session> sessionsById = sessionRepository
                .findByClassField_IdAndDayOfWeekOrderByStartAtAsc(classRoom.getId(), dayOfWeekValue)
                .stream()
                .collect(Collectors.toMap(Session::getId, s -> s));

        Set<Long> validStudentIds = studentRepository
                .findByStudentClassIdOrderByUserFirstNameAsc(classRoom.getId())
                .stream()
                .map(Student::getStudent_id)
                .collect(Collectors.toSet());

        LocalDateTime dayStart = request.getDate().atStartOfDay();
        LocalDateTime dayEnd = request.getDate().plusDays(1).atStartOfDay();

        for (AttendanceEntryRequest entry : request.getEntries()) {
            if (!validStudentIds.contains(entry.getStudentId())) {
                throw new IllegalArgumentException(
                        "Student " + entry.getStudentId() + " does not belong to class " + classRoom.getName());
            }

            Session session = sessionsById.get(entry.getSessionId());
            if (session == null) {
                throw new IllegalArgumentException(
                        "Session " + entry.getSessionId() + " is not scheduled for class "
                                + classRoom.getName() + " on this day");
            }

            Attendance record = attendanceRepo
                    .findByStudentAndSessionOnDate(entry.getStudentId(), session.getId(), dayStart, dayEnd)
                    .orElseGet(() -> {
                        Attendance newRecord = new Attendance();
                        Student studentRef = new Student();
                        studentRef.setStudent_id(entry.getStudentId());
                        newRecord.setStudent(studentRef);
                        newRecord.setSession(session);
                        newRecord.setDateTime(request.getDate().atTime(9, 0));
                        return newRecord;
                    });

            record.setStatus(entry.getStatus() != null && !entry.getStatus().isEmpty() ? entry.getStatus().charAt(0) : null);
            attendanceRepo.save(record);
        }

        return getAttendanceGrid(classRoom.getId(), request.getDate());
    }

    @Transactional(readOnly = true)
    public List<ClassResponse> getAllClasses() {
        return classRepository.findAll().stream()
                .sorted(Comparator.comparing(Class::getName))
                .map(c -> {
                    ClassResponse cRes = new ClassResponse();
                    cRes.setId(c.getId());
                    cRes.setName(c.getName());
                    cRes.setDisplayName("Class " + c.getName());
                    cRes.setStudentCount((int) studentRepository.countByStudentClassId(c.getId()));
                    return cRes;
                })
                .collect(Collectors.toList());
    }

    private String buildFullName(Student student) {
        User user = student.getUser();
        String first = user.getFirstName() != null ? user.getFirstName() : "";
        String last = user.getLastName() != null ? user.getLastName() : "";
        return (first + " " + last).trim();
    }

    private String buildInitials(Student student) {
        User user = student.getUser();
        String first = user.getFirstName();
        String last = user.getLastName();
        String firstInitial = (first != null && !first.isEmpty()) ? first.substring(0, 1) : "";
        String lastInitial = (last != null && !last.isEmpty()) ? last.substring(0, 1) : "";
        return (firstInitial + lastInitial).toUpperCase();
    }
}
