
document.addEventListener("DOMContentLoaded",()=>{
 const nav=document.querySelector(".site-nav"),menu=document.querySelector(".menu");
 if(nav&&menu){menu.addEventListener("click",()=>{const open=nav.classList.toggle("mobile-open");menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Close menu":"Open menu");document.body.classList.toggle("menu-open",open);});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("mobile-open");menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Open menu");document.body.classList.remove("menu-open");}));}
 document.querySelectorAll(".nav-dropdown > button").forEach(btn=>btn.addEventListener("click",e=>{e.preventDefault();const d=btn.parentElement,o=d.classList.toggle("open");btn.setAttribute("aria-expanded",String(o));}));
 document.addEventListener("click",e=>document.querySelectorAll(".nav-dropdown.open").forEach(d=>{if(!d.contains(e.target)){d.classList.remove("open");const b=d.querySelector(":scope>button");if(b)b.setAttribute("aria-expanded","false");}}));
 document.querySelectorAll(".faq-question").forEach(btn=>btn.addEventListener("click",()=>{const item=btn.closest(".faq-item"),open=item.classList.toggle("open");btn.setAttribute("aria-expanded",String(open));btn.querySelector("span:last-child").textContent=open?"−":"+";}));
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
 const form=document.querySelector("[data-contact-form]"),status=document.querySelector("[data-form-status]");
 if(form&&status)form.addEventListener("submit",e=>{e.preventDefault();if(!form.checkValidity()){form.reportValidity();return;}status.textContent="Please review your details and contact RamjiMS directly using the phone or email below. This static site does not send form data to a server.";});
});
