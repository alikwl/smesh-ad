import{s as I,t as w,m as B,n as A,k as T}from"./supabase.M5dTTGS6.js";const $=`{
  "title": "Resource Title",
  "slug": "resource-slug",
  "category": "Guide",
  "description": "Short description...",
  "preview_image": "https://drive.google.com/...",
  "bullet_points": ["Point 1", "Point 2", "Point 3"],
  "table_of_contents": ["Chapter 1", "Chapter 2"],
  "excerpt": "Chapter preview text...",
  "locked_content": "## Full markdown content...",
  "cta_headline": "Found this useful?",
  "cta_subtext": "Get notified when we publish more.",
  "target_service_tag": "workflow-automation",
  "estimated_value": "$29 Value",
  "published": true,
  "premium": false
}`;function N(t){const r=[];return!t||typeof t!="object"?(r.push("JSON must be an object."),r):((!t.title||typeof t.title!="string"||!t.title.trim())&&r.push('Field "title" is required and must be a non-empty string.'),!t.slug||typeof t.slug!="string"||!t.slug.trim()?r.push('Field "slug" is required and must be a non-empty string.'):/^[a-z0-9-_]+$/.test(t.slug)||r.push('Field "slug" can only contain lowercase letters, numbers, hyphens, and underscores.'),(!t.category||typeof t.category!="string"||!t.category.trim())&&r.push('Field "category" is required and must be a non-empty string.'),(!t.description||typeof t.description!="string"||!t.description.trim())&&r.push('Field "description" is required and must be a non-empty string.'),(!t.locked_content||typeof t.locked_content!="string"||!t.locked_content.trim())&&r.push('Field "locked_content" is required and must be a non-empty string.'),t.bullet_points!==void 0&&!Array.isArray(t.bullet_points)?r.push('Field "bullet_points" must be an array of strings.'):Array.isArray(t.bullet_points)&&!t.bullet_points.every(u=>typeof u=="string")&&r.push('All items in "bullet_points" array must be strings.'),t.table_of_contents!==void 0&&!Array.isArray(t.table_of_contents)?r.push('Field "table_of_contents" must be an array of strings.'):Array.isArray(t.table_of_contents)&&!t.table_of_contents.every(u=>typeof u=="string")&&r.push('All items in "table_of_contents" array must be strings.'),r)}document.addEventListener("DOMContentLoaded",async()=>{const t=document.getElementById("resource-table-body");if(!t)return;const r=document.getElementById("import-json-btn"),u=document.getElementById("import-modal"),L=document.getElementById("modal-close-x"),p=document.getElementById("import-json-textarea"),k=document.getElementById("modal-preview-btn"),o=document.getElementById("modal-confirm-btn"),E=document.getElementById("modal-cancel-btn"),a=document.getElementById("modal-error-alert"),d=document.getElementById("modal-error-text"),m=document.getElementById("modal-preview-section"),h=document.getElementById("preview-table-body"),g=document.getElementById("import-toast"),v=document.getElementById("import-toast-text");p&&(p.placeholder=$);const C=i=>{!g||!v||(v.textContent=i,g.classList.remove("opacity-0","translate-y-12","pointer-events-none"),g.classList.add("opacity-100","translate-y-0"),setTimeout(()=>{g.classList.remove("opacity-100","translate-y-0"),g.classList.add("opacity-0","translate-y-12","pointer-events-none")},3e3))},f=()=>{u?.classList.add("hidden"),p&&(p.value=""),a?.classList.add("hidden"),m?.classList.add("hidden"),o&&(o.disabled=!0,o.textContent="Confirm Import")};r?.addEventListener("click",()=>{u?.classList.remove("hidden")}),L?.addEventListener("click",f),E?.addEventListener("click",f);let n=null;k?.addEventListener("click",()=>{if(!p||!a||!d||!m||!h||!o)return;const i=p.value.trim();if(!i){d.textContent="Please paste a JSON payload first.",a.classList.remove("hidden"),m.classList.add("hidden"),o.disabled=!0;return}try{const s=JSON.parse(i),e=N(s);if(e.length>0){d.innerHTML='<strong>Validation errors found:</strong><ul class="list-disc pl-4 mt-1">'+e.map(l=>`<li>${l}</li>`).join("")+"</ul>",a.classList.remove("hidden"),m.classList.add("hidden"),o.disabled=!0;return}a.classList.add("hidden"),n=s;const b=[{key:"title",value:s.title},{key:"slug",value:s.slug},{key:"category",value:s.category},{key:"description",value:s.description},{key:"preview_image",value:s.preview_image||"(None)"},{key:"cta_headline",value:s.cta_headline||"(None)"},{key:"cta_subtext",value:s.cta_subtext||"(None)"},{key:"target_service_tag",value:s.target_service_tag||"(None)"},{key:"estimated_value",value:s.estimated_value||"(None)"},{key:"published",value:s.published?"Yes":"No"},{key:"premium",value:s.premium?"Yes":"No"}];h.innerHTML=b.map(l=>`
          <tr class="border-b border-slate-850/45 hover:bg-slate-900/25">
            <td class="px-4 py-2 font-semibold text-slate-450">${l.key}</td>
            <td class="px-4 py-2 text-slate-200 truncate max-w-xs">${l.value}</td>
          </tr>
        `).join(""),m.classList.remove("hidden"),o.disabled=!1}catch(s){d.textContent="Invalid JSON structure: "+s.message,a.classList.remove("hidden"),m.classList.add("hidden"),o.disabled=!0}}),o?.addEventListener("click",async()=>{if(!n||!o||!a||!d)return;o.disabled=!0,o.textContent="Importing...";const i=new Date().toISOString(),s={title:n.title,slug:n.slug,category:n.category,description:n.description,preview_image:n.preview_image||"",bullet_points:n.bullet_points||[],table_of_contents:n.table_of_contents||[],excerpt:n.excerpt||"",locked_content:n.locked_content,cta_headline:n.cta_headline||null,cta_subtext:n.cta_subtext||null,target_service_tag:n.target_service_tag||"",estimated_value:n.estimated_value||"",published:!!n.published,premium:!!n.premium,updated_at:i};try{const{error:e}=await I.from("resources").insert([s]);e?(e.code==="23505"||e.message&&e.message.includes("unique constraint")&&e.message.includes("slug")?d.textContent="Slug already exists, please change it":(d.textContent="Import failed. Check console.",console.error("Supabase error:",e)),a.classList.remove("hidden"),o.disabled=!1,o.textContent="Confirm Import"):(f(),C("Resource imported successfully!"),s.published&&await w(),await y())}catch(e){d.textContent="Unexpected error: "+e.message,a.classList.remove("hidden"),o.disabled=!1,o.textContent="Confirm Import"}});const y=async()=>{t.innerHTML=`
        <tr class="animate-pulse">
          <td colspan="5" class="px-6 py-12 text-center text-slate-400">Loading resources...</td>
        </tr>
      `;const{data:i,error:s}=await B();if(s){console.error("Failed to load resources:",s),t.innerHTML=`
          <tr>
            <td colspan="5" class="px-6 py-12 text-center text-rose-600 font-semibold bg-rose-50/40">Failed to load resources.</td>
          </tr>
        `;return}if(!i||i.length===0){t.innerHTML=`
          <tr>
            <td colspan="5" class="px-6 py-12 text-center text-slate-400">
              <div class="flex flex-col items-center justify-center space-y-2">
                <i class="ti ti-folder-off text-2xl text-slate-350"></i>
                <span>No resources created yet.</span>
              </div>
            </td>
          </tr>
        `;return}t.innerHTML=i.map(e=>{const b=e.updated_at?new Date(e.updated_at).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}):"N/A",l=e.published?'<span class="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100">Published</span>':'<span class="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-slate-150 text-slate-500 border border-slate-200/50">Draft</span>',x=e.published?"Unpublish":"Publish";return`
          <tr class="hover:bg-slate-50/70 transition-colors">
            <td class="px-6 py-4 text-slate-900 font-semibold max-w-sm truncate">${e.title}</td>
            <td class="px-6 py-4 text-slate-655 font-medium">${e.category||"Uncategorized"}</td>
            <td class="px-6 py-4">${l}</td>
            <td class="px-6 py-4 text-slate-450">${b}</td>
            <td class="px-6 py-4 text-right space-x-1.5 shrink-0 whitespace-nowrap">
              <button 
                data-action="toggle-publish" 
                data-id="${e.id}" 
                data-title="${e.title}"
                data-published="${e.published}"
                class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition cursor-pointer"
              >
                ${x}
              </button>
              <a 
                href="/resources/edit/?id=${e.id}"
                class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-[#1D9E75] hover:text-white hover:border-[#1D9E75] transition"
              >
                Edit
              </a>
              <button 
                data-action="delete" 
                data-id="${e.id}"
                data-title="${e.title}"
                class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition cursor-pointer"
              >
                Delete
              </button>
            </td>
          </tr>
        `}).join("")};t.addEventListener("click",async i=>{const e=i.target.closest("button");if(!e)return;const b=e.getAttribute("data-action"),l=e.getAttribute("data-id")||"",x=e.getAttribute("data-title")||"";if(b==="delete"&&confirm(`Are you sure you want to delete "${x}"?`)){e.disabled=!0,e.textContent="Deleting...";const{error:c}=await A(l);c?(alert("Failed: "+c.message),e.disabled=!1,e.textContent="Delete"):await y()}if(b==="toggle-publish"){const c=e.getAttribute("data-published")==="true";e.disabled=!0,e.textContent=c?"Unpublishing...":"Publishing...";const{error:_}=await T({published:!c},l);_?(alert("Failed: "+_.message),e.disabled=!1,e.textContent=c?"Unpublish":"Publish"):(c||await w(),await y())}}),await y()});
