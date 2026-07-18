import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly LANG_KEY = 'app_language';

  currentLang = signal<'en' | 'ar'>((localStorage.getItem(this.LANG_KEY) as 'en' | 'ar') || 'en');

  private translations: Record<'en' | 'ar', Record<string, string>> = {
    en: {
      'Main Menu': 'Main Menu',
      Dashboard: 'Dashboard',
      Students: 'Students',
      Attendance: 'Attendance',
      'Welcome Back': 'Welcome Back',
      'Please login to your account': 'Please login to your account',
      Login: 'Login',
      'Enter Your Email': 'Enter Your Email',
      'Please enter a valid email format (example@company.com)':
        'Please enter a valid email format (example@company.com)',
      'The email field is required': 'The email field is required',
      'Enter Your Password': 'Enter Your Password',
      'The password must be at least 6 characters': 'The password must be at least 6 characters',
      'The password field is required': 'The password field is required',
      'Remember me': 'Remember me',
      'Forgot Password?': 'Forgot Password?',
      'Login Failed': 'Login Failed',
      'The username or password you entered is incorrect. Please double-check your spelling and try again.':
        'The username or password you entered is incorrect. Please double-check your spelling and try again.',
      'Something went wrong with your request please check your internet.':
        'Something went wrong with your request please check your internet.',
      Done: 'Done',
      'Student has been deleted successfully': 'Student has been deleted successfully',
      'Your session expired': 'Your session expired',
      'Please login again to continue using the application':
        'Please login again to continue using the application',
      Continue: 'Continue',
      'Unexpected error — please try again later': 'Unexpected error — please try again later',
      'We are sorry, please try again later': 'We are sorry, please try again later',
      'Try again': 'Try again',
      'Error!': 'Error!',
      'Something went wrong. Please try again.': 'Something went wrong. Please try again.',
      Ok: 'Ok',
      Close: 'Close',
    },
    ar: {
      'Main Menu': 'القائمة الرئيسية',
      Dashboard: 'لوحة التحكم',
      Students: 'الطلاب',
      Attendance: 'الحضور',
      'Welcome Back': 'مرحباً بعودتك',
      'Please login to your account': 'يرجى تسجيل الدخول إلى حسابك',
      Login: 'تسجيل الدخول',
      'Enter Your Email': 'أدخل بريدك الإلكتروني',
      'Please enter a valid email format (example@company.com)':
        'يرجى إدخال بريد إلكتروني صالح (example@company.com)',
      'The email field is required': 'حقل البريد الإلكتروني مطلوب',
      'Enter Your Password': 'أدخل كلمة المرور',
      'The password must be at least 6 characters': 'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
      'The password field is required': 'حقل كلمة المرور مطلوب',
      'Remember me': 'تذكرني',
      'Forgot Password?': 'هل نسيت كلمة المرور؟',
      'Login Failed': 'فشل تسجيل الدخول',
      'The username or password you entered is incorrect. Please double-check your spelling and try again.':
        'اسم المستخدم أو كلمة المرور التي أدخلتها غير صحيحة. يرجى التحقق وإعادة المحاولة.',
      'Something went wrong with your request please check your internet.':
        'حدث خطأ ما في طلبك، يرجى التحقق من اتصالك بالإنترنت.',
      Done: 'تم',
      'Your session expired': 'انتهت جلستك',
      'Done!': "تم !",
      "Your action has been completed successfully.": "تم تسجيل دخولك بنجاح",
      'Please login again to continue using the application': 'يرجى تسجيل الدخول مرة أخرى للمتابعة',
      Continue: 'متابعة',
      'Unexpected error — please try again later': 'خطأ غير متوقع - يرجى المحاولة لاحقاً',
      'We are sorry, please try again later': 'نحن آسفون، يرجى المحاولة لاحقاً',
      'Try again': 'حاول مرة أخرى',
      'Error!': 'خطأ!',
      'Something went wrong. Please try again.': 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
      Ok: 'موافق',
      Close: 'إغلاق',
    },
  };

  constructor() {
    effect(() => {
      const lang = this.currentLang();
      localStorage.setItem(this.LANG_KEY, lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    });
  }

  setLanguage(lang: 'en' | 'ar') {
    this.currentLang.set(lang);
  }

  translate(key: string): string {
    const lang = this.currentLang();
    return this.translations[lang]?.[key] ?? key;
  }
}
