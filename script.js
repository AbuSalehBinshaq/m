function changeImage(el) {
      document.getElementById("mainImage").src = el.src;
      document.querySelectorAll(".thumbs img").forEach(img => img.classList.remove("active"));
      el.classList.add("active");
    }

    function openModal() {
      document.getElementById("modal").style.display = "flex";
    }

    window.onclick = function(e) {
      const modal = document.getElementById("modal");
      if (e.target === modal) {
        modal.style.display = "none";
        document.getElementById("orderForm").style.display = "none";
      }
    }

    function sendInquiry() {
      const msg = encodeURIComponent("مرحبًا، لدي استفسار عن جلابية الأحمر الملكي.");
      window.open(`https://wa.me/971582868634?text=${msg}`, "_blank");
    }

    function showForm() {
      document.getElementById("orderForm").style.display = "block";
    }

    function showToast(message) {
      const toast = document.getElementById("toast");
      toast.textContent = message;
      toast.className = "toast show";
      setTimeout(function() { toast.className = toast.className.replace("show", ""); }, 3000);
    }

    function sendOrder() {
      const nameInput = document.getElementById("name");
      const phoneInput = document.getElementById("phone");
      const cityInput = document.getElementById("city");
      const sizeInput = document.getElementById("size");
      const quantity = document.getElementById("quantity").value;
      const notes = document.getElementById("notes").value;

      // إزالة أنماط الخطأ السابقة
      nameInput.classList.remove("input-error");
      phoneInput.classList.remove("input-error");
      cityInput.classList.remove("input-error");
      sizeInput.classList.remove("input-error");

      let isValid = true;

      if (!nameInput.value) {
        nameInput.classList.add("input-error");
        isValid = false;
      }
      if (!phoneInput.value) {
        phoneInput.classList.add("input-error");
        isValid = false;
      }
      if (!cityInput.value) {
        cityInput.classList.add("input-error");
        isValid = false;
      }
      // ملاحظة: لإزالة حقل المقاس في المستقبل، قم بحذف السطر التالي:
      // if (!sizeInput.value) {
      //   sizeInput.classList.add("input-error");
      //   isValid = false;
      // }

      if (!isValid) {
        showToast("الرجاء تعبئة جميع الحقول الإلزامية.");
        return;
      }

      // التحقق من صحة رقم الجوال (9 أرقام)
      if (!/^[0-9]{9}$/.test(phoneInput.value)) {
        phoneInput.classList.add("input-error");
        showToast("الرجاء إدخال رقم جوال صحيح مكون من 9 أرقام بعد رمز الدولة.");
        return;
      }

      const fullPhone = "+971" + phoneInput.value;

      // ملاحظة: لإزالة المقاس، احذف السطر "المقاس: ${sizeInput.value}" من الرسالة التالية
      const msg = encodeURIComponent(`طلب جديد:\n  المنتج: جلابية فاخرة – الأحمر الملكي\n  الاسم: ${nameInput.value}\n  رقم الجوال: ${fullPhone}\n  المدينة/العنوان: ${cityInput.value}\n  المقاس: ${sizeInput.value}\n  الكمية: ${quantity}\n  ملاحظات: ${notes || "لا توجد"}`);

      window.open(`https://wa.me/971582868634?text=${msg}`, "_blank");
    }

    function adjustQty(amount) {
      const qtyInput = document.getElementById("quantity");
      let current = parseInt(qtyInput.value);
      if (isNaN(current)) current = 1;
      current = Math.max(1, current + amount);
      qtyInput.value = current;
    }

    // منع إدخال غير الأرقام في خانة الجوال
    function fixPhonePrefix(input) {
      input.value = input.value.replace(/[^\d]/g, ""); // مسح أي حروف
    }

