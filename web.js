// Simple interactions: mobile nav, filters, order modal, forms
document.addEventListener('DOMContentLoaded', function () {
    // Utils
    const $ = (s, root = document) => root.querySelector(s);
    const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

    // Mobile nav toggle
    const navToggle = $('#navToggle');
    const nav = $('#nav');
    navToggle && navToggle.addEventListener('click', () => nav.classList.toggle('open'));

    // Set year
    $('#year').textContent = new Date().getFullYear();

    // Filters
    const filterBtns = $$('.filter-btn');
    const menuGrid = $('#menuGrid');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            $$('.menu-item', menuGrid).forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Order Modal
    const orderModal = $('#orderModal');
    const orderBtns = $$('.order-btn');
    const openModalFor = (name, price) => {
        $('#modalTitle').textContent = `Order — ${name}`;
        $('#itemName').value = name;
        $('#itemPrice').value = price;
        $('#orderResult').textContent = '';
        orderModal.setAttribute('aria-hidden', 'false');
    };
    orderBtns.forEach(b => {
        b.addEventListener('click', () => {
            openModalFor(b.dataset.name, b.dataset.price);
        });
    });

    // Buttons to open modal
    $('#orderNow')?.addEventListener('click', () => {
        openModalFor('TastyBite Combo', '299');
    });
    $('#orderNowTop')?.addEventListener('click', () => {
        openModalFor('TastyBite Combo', '299');
    });

    // Modal close
    $('#modalClose').addEventListener('click', () => orderModal.setAttribute('aria-hidden', 'true'));
    $('#modalCancel').addEventListener('click', () => orderModal.setAttribute('aria-hidden', 'true'));
    // close modal on outside click
    orderModal.addEventListener('click', (e) => {
        if (e.target === orderModal) orderModal.setAttribute('aria-hidden', 'true');
    });

    // Order form submit (simulated)
    $('#orderForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const name = $('#customerName').value.trim();
        const phone = $('#customerPhone').value.trim();
        const address = $('#customerAddress').value.trim();
        if (!name || !phone || !address) {
            $('#orderResult').textContent = 'Please fill in all fields.';
            return;
        }
        // Simulate server call
        $('#orderResult').textContent = 'Placing order...';
        setTimeout(() => {
            $('#orderResult').textContent = `Thanks ${name}! Your order for "${$('#itemName').value}" is confirmed. We'll call ${phone} shortly.`;
            // Reset small fields
            $('#customerName').value = '';
            $('#customerPhone').value = '';
            $('#customerAddress').value = '';
            // Auto close modal after a short time
            setTimeout(() => orderModal.setAttribute('aria-hidden', 'true'), 2500);
        }, 900);
    });

    // Contact form
    $('#contactForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const nm = $('#contactName').value.trim();
        const info = $('#contactInfo').value.trim();
        const msg = $('#contactMessage').value.trim();
        if (!nm || !info || !msg) {
            $('#contactResult').textContent = 'Please fill all fields.';
            return;
        }
        $('#contactResult').textContent = 'Sending message...';
        setTimeout(() => {
            $('#contactResult').textContent = 'Thanks! We received your message and will get back to you soon.';
            $('#contactForm').reset();
        }, 800);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});