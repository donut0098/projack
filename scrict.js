// เพิ่ม Event Listener เมื่อโหลด DOM เสร็จสมบูรณ์
// รอให้ DOM โหลดเสร็จก่อนที่จะทำงานต่อไป เพื่อให้แน่ใจว่าสามารถเข้าถึง Element ต่างๆได้
document.addEventListener('DOMContentLoaded', function() {

    // จัดการเมนูแบบ Dropdown
    // ค้นหา Element ที่มี class 'dropdown' ทั้งหมด
    // เพิ่ม Event สำหรับแสดง/ซ่อนเมนู Dropdown เมื่อ hover
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        // แสดงเมนูเมื่อเมาส์ชี้
        dropdown.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-content').style.display = 'block';
        });
        
        // ซ่อนเมนูเมื่อเมาส์ออก
        dropdown.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-content').style.display = 'none';
        });
    });

    // เพิ่มเอฟเฟกต์ Smooth Scroll
    // ทำให้การคลิกลิงก์ภายในหน้าเว็บเลื่อนแบบนุ่มนวล
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // ป้องกันการทำงานปกติของลิงก์
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth' // กำหนดให้เลื่อนแบบ smooth
            });
        });
    });

    // จัดการ Header แบบ Sticky
    // ทำให้ header ซ่อน/แสดงตามการเลื่อนหน้าจอ
    const header = document.querySelector('.main-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // ถ้าอยู่บนสุดของหน้า
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        // เลื่อนลง: ซ่อน header
        // เลื่อนขึ้น: แสดง header
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // เพิ่มเอฟเฟกต์ Fade In สำหรับรูปภาพ
    // ใช้ Intersection Observer API เพื่อตรวจจับเมื่อรูปภาพปรากฏในหน้าจอ
    const images = document.querySelectorAll('img');
    const options = {
        threshold: 0.5 // กำหนดให้แสดงเมื่อรูปปรากฏ 50% ขึ้นไป
    };

    // สร้าง observer สำหรับตรวจจับการปรากฏของรูปภาพ
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in'); // เพิ่ม class เพื่อทำ animation
                observer.unobserve(entry.target); // หยุดการ observe หลังจากแสดงแล้ว
            }
        });
    }, options);

    // เริ่มสังเกตการณ์รูปภาพทั้งหมด
    images.forEach(image => {
        imageObserver.observe(image);
    });

});

// ฟังก์ชันกรองเมนูตามประเภท
function filterMenu() {
    const buttons = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            menuCards.forEach(card => {
                if (filter === 'all' || card.dataset.category.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ฟังก์ชันเพิ่มสินค้าในตะกร้า
function addToCart() {
    let cartCount = 0;
    const cartCounter = document.getElementById('cart-count');
    const addButtons = document.querySelectorAll('.add-to-cart');

    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;
            cartCounter.textContent = cartCount;
        });
    });
}

// ฟังก์ชันการเลื่อน Scroll อย่างนุ่มนวล
function smoothScrolling() {
    const scrollLinks = document.querySelectorAll('.scroll-link');

    scrollLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ฟังก์ชันแสดงรายละเอียดใน Modal
function setupModal() {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    const closeModalBtn = document.querySelector('.close-btn');
    const detailButtons = document.querySelectorAll('.view-details');

    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            modalText.textContent = button.dataset.details;
            modal.style.display = 'block';
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// เรียกใช้ฟังก์ชันทั้งหมดเมื่อโหลดหน้าเสร็จ
window.onload = function () {
    filterMenu();
    addToCart();
    smoothScrolling();
    setupModal();
};
