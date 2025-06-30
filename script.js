document.addEventListener('DOMContentLoaded', () => {
    console.log('الموقع جاهز!');

    // مثال بسيط على تأثير عند التمرير (باستخدام Intersection Observer API)
    // هذا سيتطلب تنسيق CSS مبدئي للعناصر (مثلاً opacity: 0; transform: translateY(20px);)
    // ومثلاً إضافة كلاس مثل .fade-in-up عند ظهور العنصر
    const faders = document.querySelectorAll('.animate__animated'); // استخدم نفس الكلاسات من Animate.css

    const appearOptions = {
        threshold: 0.1, // متى يظهر العنصر (10% منه مرئي)
        rootMargin: "0px 0px -50px 0px" // لتشغيل التأثير قبل وصول العنصر لأسفل الشاشة بـ 50 بكسل
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('animate__fadeInUp'); // أو أي تأثير Animate.css آخر
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // مثال على كيفية استخدام GSAP للرسوم المتحركة الأكثر تعقيدًا
    // ستحتاج إلى ربط مكتبة GSAP في ملف HTML كما هو موضح أعلاه
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // مثال لتحريك الشعار عند التمرير
        gsap.from(".logo h1", {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".main-header",
                start: "top top",
                toggleActions: "play none none reverse"
            }
        });

        // مثال لتحريك أقسام الموقع عند التمرير
        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%", // عندما يكون 80% من القسم مرئياً
                    toggleActions: "play none none reverse"
                }
            });
        });

        // لتأثيرات أكثر تعقيدًا على الصور أو عناصر محددة في الصفحات
        // على سبيل المثال، تأثير hover على صور المعرض في صفحة "أعمالنا"
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item.querySelector('img'), { scale: 1.05, duration: 0.3 });
                gsap.to(item.querySelector('.overlay'), { opacity: 1, duration: 0.3 });
            });
            item.addEventListener('mouseleave', () => {
                gsap.to(item.querySelector('img'), { scale: 1, duration: 0.3 });
                gsap.to(item.querySelector('.overlay'), { opacity: 0, duration: 0.3 });
            });
        });


    } else {
        console.warn('GSAP لم يتم تحميله. الرسوم المتحركة المتقدمة لن تعمل.');
    }


    // يمكنك إضافة المزيد من أكواد JavaScript هنا:
    // - شريط تمرير لآراء العملاء (يمكن استخدام مكتبة مثل Swiper.js أو Slick Carousel)
    // - التحقق من صحة نموذج الاتصال
    // - تأثيرات Parallax
    // - تغيير صور الخلفية في قسم Hero بشكل ديناميكي
});
