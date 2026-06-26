import{s as c,h as b,t as p,j as x}from"./supabase.DB6tOp5X.js";document.addEventListener("DOMContentLoaded",async()=>{const o=document.getElementById("portfolio-table-body");if(!o)return;const l=async()=>{o.innerHTML=`
        <tr class="animate-pulse">
          <td colspan="5" class="px-6 py-12 text-center text-slate-400">Loading portfolio cases...</td>
        </tr>
      `;const{data:s,error:i}=await x();if(i){console.error("Failed to load portfolio:",i),o.innerHTML=`
          <tr>
            <td colspan="5" class="px-6 py-12 text-center text-rose-600 font-semibold bg-rose-50/40">Failed to load portfolio.</td>
          </tr>
        `;return}if(!s||s.length===0){o.innerHTML=`
          <tr>
            <td colspan="5" class="px-6 py-12 text-center text-slate-400">
              <div class="flex flex-col items-center justify-center space-y-2">
                <i class="ti ti-folder-off text-2xl text-slate-355"></i>
                <span>No portfolio cases created yet.</span>
              </div>
            </td>
          </tr>
        `;return}o.innerHTML=s.map(t=>{const r=t.published?'<span class="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100">Published</span>':'<span class="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-slate-150 text-slate-500 border border-slate-200/50">Draft</span>',a=t.published?"Unpublish":"Publish";return`
          <tr class="hover:bg-slate-50/70 transition-colors">
            <td class="px-6 py-4 text-slate-900 font-semibold max-w-sm truncate">${t.title}</td>
            <td class="px-6 py-4 text-slate-655 font-medium">${t.client_type||"Uncategorized"}</td>
            <td class="px-6 py-4 text-slate-500 font-mono">${t.sort_order??0}</td>
            <td class="px-6 py-4">${r}</td>
            <td class="px-6 py-4 text-right space-x-1.5 shrink-0 whitespace-nowrap">
              <button 
                data-action="toggle-publish" 
                data-id="${t.id}" 
                data-title="${t.title}"
                data-published="${t.published}"
                class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition cursor-pointer"
              >
                ${a}
              </button>
              <a 
                href="/portfolio/${t.id}/"
                class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-[#1D9E75] hover:text-white hover:border-[#1D9E75] transition"
              >
                Edit
              </a>
              <button 
                data-action="delete" 
                data-id="${t.id}"
                data-title="${t.title}"
                class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition cursor-pointer"
              >
                Delete
              </button>
            </td>
          </tr>
        `}).join("")};o.addEventListener("click",async s=>{const t=s.target.closest("button");if(!t)return;const r=t.getAttribute("data-action"),a=t.getAttribute("data-id")||"",d=t.getAttribute("data-title")||"";if(r==="delete"&&confirm(`Are you sure you want to delete "${d}"?`)){t.disabled=!0,t.textContent="Deleting...";const{error:e}=await c.from("portfolio").delete().eq("id",a);e?(alert("Failed: "+e.message),t.disabled=!1,t.textContent="Delete"):await l()}if(r==="toggle-publish"){const e=t.getAttribute("data-published")==="true";t.disabled=!0,t.textContent=e?"Unpublishing...":"Publishing...";const{error:n}=await b({published:!e},a);n?(alert("Failed: "+n.message),t.disabled=!1,t.textContent=e?"Unpublish":"Publish"):(e||await p(),await l())}}),await l()});
