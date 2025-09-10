document.querySelector('.scroll_down').addEventListener('click', function (e) {
  e.preventDefault();

  const targetId = this.getAttribute('href').substring(1);
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
});

document.querySelector(".connect-btn").addEventListener("click", () => {
  document.querySelector("#contact").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }

    document.querySelectorAll(".nav-link").forEach(nav =>
      nav.classList.remove("active")
    );

    link.classList.add("active");

    localStorage.setItem("activeSection", targetId);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function setActive(sectionId) {
    navLinks.forEach(link => link.classList.remove("active"));
    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
      localStorage.setItem("activeSection", sectionId); // 
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach(section => observer.observe(section));

  const savedSection = localStorage.getItem("activeSection");
  if (savedSection) {
    setActive(savedSection);
  } else if (sections.length > 0) {
    setActive(sections[0].id);
  }

});
