const shareData = {
  title: "Jacquese Hinton",
  text: "Jacquese Hinton — Strategy built for the extraordinary.",
  url: window.location.href
};

const toast = document.getElementById("toast");

function showToast(message = "Link copied to clipboard.") {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

async function shareCard() {
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    showToast();
  } catch (error) {
    if (error && error.name === "AbortError") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast();
    } catch {
      showToast("Copy this page URL to share the card.");
    }
  }
}

document.getElementById("shareButton")?.addEventListener("click", shareCard);
document.getElementById("mobileShare")?.addEventListener("click", shareCard);

document.getElementById("year").textContent = new Date().getFullYear();

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add("is-visible"));
}
