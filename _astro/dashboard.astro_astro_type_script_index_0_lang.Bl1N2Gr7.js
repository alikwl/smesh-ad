import{t as p,s as c}from"./supabase.DB6tOp5X.js";const m=()=>{const e=localStorage.getItem("last_deployed");document.querySelectorAll(".last-deployed-text").forEach(a=>{a.textContent=e||"Never"})};m();const y=async()=>{try{const{count:e}=await c.from("blog_posts").select("*",{count:"exact",head:!0}),s=document.getElementById("stat-posts");s&&(s.textContent=String(e||0));const{count:a}=await c.from("resources").select("*",{count:"exact",head:!0}),o=document.getElementById("stat-resources");o&&(o.textContent=String(a||0));const r=new Date;r.setDate(r.getDate()-7);const{count:d}=await c.from("resource_leads").select("*",{count:"exact",head:!0}).gt("created_at",r.toISOString()),l=document.getElementById("stat-leads-week");l&&(l.textContent=String(d||0));const{count:g}=await c.from("contact_submissions").select("*",{count:"exact",head:!0}),u=document.getElementById("stat-contacts");u&&(u.textContent=String(g||0))}catch(e){console.error("Failed to load dashboard statistics:",e)}},x=async()=>{const e=document.getElementById("recent-submissions-body");if(e)try{const{data:s,error:a}=await c.from("contact_submissions").select("name, whatsapp, budget, service, page_url, created_at").order("created_at",{ascending:!1}).limit(5);if(a)throw a;if(!s||s.length===0){e.innerHTML=`
            <tr>
              <td colspan="4" class="px-5 py-8 text-center text-slate-400 italic">No inquiries found.</td>
            </tr>
          `;return}e.innerHTML=s.map(o=>{const r=o.created_at?new Date(o.created_at).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}):"N/A",d=[o.service,o.page_url].filter(Boolean).join(" • "),l=d?`<div class="text-[9px] font-normal text-slate-450 mt-0.5 max-w-[200px] truncate" title="${d}">${d}</div>`:"";return`
            <tr class="hover:bg-slate-50/50 transition-colors">
              <td class="px-5 py-3.5 font-bold text-slate-900">
                ${o.name||"Anonymous"}
                ${l}
              </td>
              <td class="px-5 py-3.5 text-slate-600 font-mono">${o.whatsapp||"N/A"}</td>
              <td class="px-5 py-3.5 text-slate-655 font-semibold">${o.budget||"N/A"}</td>
              <td class="px-5 py-3.5 text-right text-slate-450">${r}</td>
            </tr>
          `}).join("")}catch(s){console.error("Failed to load inquiries list:",s),e.innerHTML=`
          <tr>
            <td colspan="4" class="px-5 py-8 text-center text-rose-600 font-semibold bg-rose-50/40">Failed to load inquiries list.</td>
          </tr>
        `}},t=document.getElementById("dashboard-deploy-btn"),n=document.getElementById("dashboard-deploy-text"),i=document.getElementById("dashboard-deploy-spinner");t?.addEventListener("click",async()=>{if(!(!t||!n||!i)){t.disabled=!0,n.textContent="Deploying...",i.classList.remove("hidden"),t.classList.remove("bg-[#1D9E75]","hover:bg-[#0F6E56]"),t.classList.add("bg-slate-700");try{if(await p()){const s=new Date().toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"});localStorage.setItem("last_deployed",s),m(),n.textContent="✓ Build triggered!",i.classList.add("hidden"),t.classList.remove("bg-slate-700"),t.classList.add("bg-emerald-600"),setTimeout(()=>{t.disabled=!1,n.textContent="🚀 Deploy Site",t.classList.remove("bg-emerald-600"),t.classList.add("bg-[#1D9E75]","hover:bg-[#0F6E56]")},3e3)}else throw new Error("Deploy failed")}catch(e){console.error(e),n.textContent="Failed. Try again",i.classList.add("hidden"),t.classList.remove("bg-slate-700"),t.classList.add("bg-rose-600"),setTimeout(()=>{t.disabled=!1,n.textContent="🚀 Deploy Site",t.classList.remove("bg-rose-600"),t.classList.add("bg-[#1D9E75]","hover:bg-[#0F6E56]")},3e3)}}});Promise.all([y(),x()]);
