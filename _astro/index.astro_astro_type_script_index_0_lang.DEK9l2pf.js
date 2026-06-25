import{m as c,k as u,t as b,n as p}from"./supabase.Kh0IKKTK.js";document.addEventListener("DOMContentLoaded",async()=>{const a=document.getElementById("resource-table-body");if(!a)return;const n=async()=>{a.innerHTML=`
        <tr class="animate-pulse">
          <td colspan="5" class="px-6 py-12 text-center text-slate-400">Loading resources...</td>
        </tr>
      `;const{data:s,error:l}=await p();if(l){console.error("Failed to load resources:",l),a.innerHTML=`
          <tr>
            <td colspan="5" class="px-6 py-12 text-center text-rose-600 font-semibold bg-rose-50/40">Failed to load resources.</td>
          </tr>
        `;return}if(!s||s.length===0){a.innerHTML=`
          <tr>
            <td colspan="5" class="px-6 py-12 text-center text-slate-400">
              <div class="flex flex-col items-center justify-center space-y-2">
                <i class="ti ti-folder-off text-2xl text-slate-350"></i>
                <span>No resources created yet.</span>
              </div>
            </td>
          </tr>
        `;return}a.innerHTML=s.map(t=>{const r=t.updated_at?new Date(t.updated_at).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}):"N/A",o=t.published?'<span class="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100">Published</span>':'<span class="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-slate-150 text-slate-500 border border-slate-200/50">Draft</span>',i=t.published?"Unpublish":"Publish";return`
          <tr class="hover:bg-slate-50/70 transition-colors">
            <td class="px-6 py-4 text-slate-900 font-semibold max-w-sm truncate">${t.title}</td>
            <td class="px-6 py-4 text-slate-655 font-medium">${t.category||"Uncategorized"}</td>
            <td class="px-6 py-4">${o}</td>
            <td class="px-6 py-4 text-slate-450">${r}</td>
            <td class="px-6 py-4 text-right space-x-1.5 shrink-0 whitespace-nowrap">
              <button 
                data-action="toggle-publish" 
                data-id="${t.id}" 
                data-title="${t.title}"
                data-published="${t.published}"
                class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition cursor-pointer"
              >
                ${i}
              </button>
              <a 
                href="/resources/${t.id}/"
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
        `}).join("")};a.addEventListener("click",async s=>{const t=s.target.closest("button");if(!t)return;const r=t.getAttribute("data-action"),o=t.getAttribute("data-id")||"",i=t.getAttribute("data-title")||"";if(r==="delete"&&confirm(`Are you sure you want to delete "${i}"?`)){t.disabled=!0,t.textContent="Deleting...";const{error:e}=await c(o);e?(alert("Failed: "+e.message),t.disabled=!1,t.textContent="Delete"):await n()}if(r==="toggle-publish"){const e=t.getAttribute("data-published")==="true";t.disabled=!0,t.textContent=e?"Unpublishing...":"Publishing...";const{error:d}=await u({published:!e},o);d?(alert("Failed: "+d.message),t.disabled=!1,t.textContent=e?"Unpublish":"Publish"):(e||await b(),await n())}}),await n()});
