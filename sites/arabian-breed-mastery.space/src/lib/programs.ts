import { photos, type SiteImage } from './images';

export type Program = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  points: string[];
  forWhom: string;
  image: SiteImage;
  metaDescription: string;
  keywords: string[];
};

export const programs: Program[] = [
  {
    slug: 'ground-longe',
    title: 'الكوردا الناعمة والتواصل من الأرض',
    eyebrow: 'عمل من الأرض',
    summary: 'تماس هادئ باليد والحبل يفهمه الحصان قبل أن يركب.',
    points: [
      'إحساس وتوقيت على الكوردا دون صراع شدّ',
      'بناء الاتصال من الأرض قبل طلب الحركة تحت السرج',
      'أنماط عملية تأخذها إلى التعامل اليومي في الإسطبل',
    ],
    forWhom:
      'لمالكي وفرسان يريدون حواراً أوضح مع الحصان من الأرض — خاصةً قبل إعادة بناء الثقة تحت السرج.',
    image: photos.workSoft,
    metaDescription:
      'برنامج الكوردا الناعمة والتواصل من الأرض مع Arabian Breed Mastery — تماس هادئ للخيول العربية في مصر.',
    keywords: ['كوردا ناعمة', 'عمل من الأرض', 'خيول عربية', 'تدريب خيل مصر'],
  },
  {
    slug: 'seat-reins',
    title: 'توازن المقعد واليد الدقيقة',
    eyebrow: 'ركوب دقيق',
    summary: 'مقعد ويد يبقيان الطلب هادئاً — واللجام معلومات لا جدالاً.',
    points: [
      'مقعد متوازن يحمل الطلب دون شدّ زائد على الفم',
      'يد دقيقة توضح اللجام دون صراع',
      'احترام الهيكل والتنفّس حتى يدوم التقدم',
    ],
    forWhom:
      'لمن يركب خيلاً عربياً حساساً ويريد ركوبًا أوضح وألطف — لا مزيداً من القوة على اللجام.',
    image: photos.workAnatomy,
    metaDescription:
      'توازن المقعد واليد الدقيقة مع Arabian Breed Mastery — ركوب هادئ للخيول العربية في مصر.',
    keywords: ['توازن المقعد', 'لجام ناعم', 'ركوب عربي', 'تشريح الخيل'],
  },
  {
    slug: 'temperament-control',
    title: 'ضبط الطبع الحار',
    eyebrow: 'تهدئة',
    summary: 'اخفض الإثارة أولاً — ثم اطلب الحركة التي تريدها.',
    points: [
      'قراءة إشارات التصعيد المبكرة لدى الخيول العربية',
      'تهدئة عبر طلبات أصغر وتوقيت أوضح',
      'الحفاظ على اللياقة دون تغذية دوامة التصعيد',
    ],
    forWhom:
      'لمن يعمل مع حصان عربي حسّاس أو «حار» يتصاعد تحت الضغط ويريد حواراً أهدأ لا قهراً.',
    image: photos.workCalm,
    metaDescription:
      'ضبط الطبع الحار للخيول العربية مع Arabian Breed Mastery — تهدئة قبل المهارة في مصر.',
    keywords: ['خيول حارة', 'تهدئة الخيل', 'طبع عربي', 'تدريب خيل مصر'],
  },
  {
    slug: 'arena-collection',
    title: 'التجميع المتقدم في الحلبة',
    eyebrow: 'أناقة الحلبة',
    summary: 'تجميع هادئ في الحلبة — شكل يحمله الجسد لا يُفرَض بالقوة.',
    points: [
      'بناء التجميع من التوازن والتنفّس لا من الشدّ',
      'انتقالات أوضح داخل الحلبة مع طلبات أصغر',
      'مسار نحو عمل أنيق — بما فيه العمل الحر — دون وعود بنتائج مسابقات',
    ],
    forWhom:
      'لمن بلغ أساساً هادئاً ويريد تجميعاً أكثر تقدماً في الحلبة، مع احترام حدود تشريح الحصان.',
    image: photos.pillarAnatomy,
    metaDescription:
      'التجميع المتقدم في الحلبة مع Arabian Breed Mastery — أناقة هادئة للخيول العربية في مصر.',
    keywords: ['تجميع الحلبة', 'عمل مانج', 'خيول عربية', 'تدريب متقدم'],
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
