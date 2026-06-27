import{s as A,t as L,c as C,d as I,b as N}from"./supabase.M5dTTGS6.js";const S=`{
  "title": "Your Blog Post Title",
  "slug": "your-blog-post-slug",
  "category": "Automation",
  "excerpt": "Short teaser paragraph...",
  "content": "## Heading\\n\\nFull markdown content...",
  "tags": ["n8n", "automation"],
  "cover_image": "/assets/images/blog/image.webp",
  "cover_image_alt": "Image description",
  "meta_title": "SEO Title Here",
  "meta_description": "Under 155 chars...",
  "seo_title": "Google Search Headline",
  "seo_description": "Google search snippet...",
  "faq_schema": [
    {"question": "Q1?", "answer": "A1."}
  ],
  "featured": false,
  "published": true,
  "reading_time": 5,
  "word_count": 500,
  "related_case_study_slug": "agency-website-automation"
}`;function T(s){const o=[];return!s||typeof s!="object"?(o.push("JSON must be an object."),o):((!s.title||typeof s.title!="string"||!s.title.trim())&&o.push('Field "title" is required and must be a non-empty string.'),!s.slug||typeof s.slug!="string"||!s.slug.trim()?o.push('Field "slug" is required and must be a non-empty string.'):/^[a-z0-9-_]+$/.test(s.slug)||o.push('Field "slug" can only contain lowercase letters, numbers, hyphens, and underscores.'),(!s.content||typeof s.content!="string"||!s.content.trim())&&o.push('Field "content" is required and must be a non-empty string.'),s.tags!==void 0&&!Array.isArray(s.tags)?o.push('Field "tags" must be an array of strings.'):Array.isArray(s.tags)&&!s.tags.every(r=>typeof r=="string")&&o.push('All items in "tags" array must be strings.'),s.meta_description!==void 0&&typeof s.meta_description=="string"&&s.meta_description.length>155&&o.push('Field "meta_description" must be 155 characters or less.'),s.faq_schema!==void 0&&!Array.isArray(s.faq_schema)?o.push('Field "faq_schema" must be a JSON array.'):Array.isArray(s.faq_schema)&&s.faq_schema.forEach((r,h)=>{(!r||typeof r!="object"||typeof r.question!="string"||typeof r.answer!="string")&&o.push(`FAQ Schema item at index ${h} must have "question" and "answer" properties as strings.`)}),o)}document.addEventListener("DOMContentLoaded",async()=>{const s=document.getElementById("blog-table-body");if(!s)return;const o=document.getElementById("import-json-btn"),r=document.getElementById("import-modal"),h=document.getElementById("modal-close-x"),m=document.getElementById("import-json-textarea"),E=document.getElementById("modal-preview-btn"),i=document.getElementById("modal-confirm-btn"),k=document.getElementById("modal-cancel-btn"),l=document.getElementById("modal-error-alert"),c=document.getElementById("modal-error-text"),p=document.getElementById("modal-preview-section"),x=document.getElementById("preview-table-body"),b=document.getElementById("import-toast"),v=document.getElementById("import-toast-text");m&&(m.placeholder=S);const B=n=>{!b||!v||(v.textContent=n,b.classList.remove("opacity-0","translate-y-12","pointer-events-none"),b.classList.add("opacity-100","translate-y-0"),setTimeout(()=>{b.classList.remove("opacity-100","translate-y-0"),b.classList.add("opacity-0","translate-y-12","pointer-events-none")},3e3))},f=()=>{r?.classList.add("hidden"),m&&(m.value=""),l?.classList.add("hidden"),p?.classList.add("hidden"),i&&(i.disabled=!0,i.textContent="Confirm Import")};o?.addEventListener("click",()=>{r?.classList.remove("hidden")}),h?.addEventListener("click",f),k?.addEventListener("click",f);let t=null;E?.addEventListener("click",()=>{if(!m||!l||!c||!p||!x||!i)return;const n=m.value.trim();if(!n){c.textContent="Please paste a JSON payload first.",l.classList.remove("hidden"),p.classList.add("hidden"),i.disabled=!0;return}try{const a=JSON.parse(n),e=T(a);if(e.length>0){c.innerHTML='<strong>Validation errors found:</strong><ul class="list-disc pl-4 mt-1">'+e.map(d=>`<li>${d}</li>`).join("")+"</ul>",l.classList.remove("hidden"),p.classList.add("hidden"),i.disabled=!0;return}l.classList.add("hidden"),t=a;const g=[{key:"title",value:a.title},{key:"slug",value:a.slug},{key:"category",value:a.category||"Uncategorized"},{key:"excerpt",value:a.excerpt||"(Empty)"},{key:"tags",value:(a.tags||[]).join(", ")||"(None)"},{key:"cover_image",value:a.cover_image||"(None)"},{key:"cover_image_alt",value:a.cover_image_alt||"(None)"},{key:"meta_title",value:a.meta_title||"(Empty)"},{key:"meta_description",value:a.meta_description||"(Empty)"},{key:"seo_title",value:a.seo_title||"(Empty)"},{key:"seo_description",value:a.seo_description||"(Empty)"},{key:"featured",value:a.featured?"Yes":"No"},{key:"published",value:a.published?"Yes":"No"},{key:"reading_time",value:a.reading_time||"5"},{key:"word_count",value:a.word_count||"(None)"},{key:"related_case_study_slug",value:a.related_case_study_slug||"(None)"}];x.innerHTML=g.map(d=>`
          <tr class="border-b border-slate-850/45 hover:bg-slate-900/25">
            <td class="px-4 py-2 font-semibold text-slate-450">${d.key}</td>
            <td class="px-4 py-2 text-slate-200 truncate max-w-xs">${d.value}</td>
          </tr>
        `).join(""),p.classList.remove("hidden"),i.disabled=!1}catch(a){c.textContent="Invalid JSON structure: "+a.message,l.classList.remove("hidden"),p.classList.add("hidden"),i.disabled=!0}}),i?.addEventListener("click",async()=>{if(!t||!i||!l||!c)return;i.disabled=!0,i.textContent="Importing...";const n=new Date().toISOString(),a={title:t.title,slug:t.slug,category:t.category||"Uncategorized",excerpt:t.excerpt||"",content:t.content,tags:t.tags||[],cover_image:t.cover_image||"",cover_image_alt:t.cover_image_alt||null,meta_title:t.meta_title||null,meta_description:t.meta_description||null,seo_title:t.seo_title||null,seo_description:t.seo_description||null,faq_schema:t.faq_schema||null,featured:!!t.featured,published:t.published!==void 0?!!t.published:t.status==="published",reading_time:t.reading_time!==void 0?Number(t.reading_time):5,word_count:t.word_count!==void 0?Number(t.word_count):null,related_case_study_slug:t.related_case_study_slug||null,canonical_url:t.canonical_url||null,og_image:t.og_image||null,author_name:t.author_name||"Haider Ali",author_bio:t.author_bio||"Haider Ali is an expert automation engineer specializing in building custom n8n pipelines, designing relational Supabase databases, training RAG-powered support chatbots, and building high-speed static websites for businesses across Pakistan and internationally.",author_avatar:t.author_avatar||"/assets/images/resources/author-haider-ali.webp",status:t.status||(t.published?"published":"draft"),updated_at:n,last_modified:n,published_at:t.published_at||(t.published?n:null)};try{const{error:e}=await A.from("blog_posts").insert([a]);e?(e.code==="23505"||e.message&&e.message.includes("unique constraint")&&e.message.includes("slug")?c.textContent="Slug already exists, please change it":(c.textContent="Import failed. Check console.",console.error("Supabase error:",e)),l.classList.remove("hidden"),i.disabled=!1,i.textContent="Confirm Import"):(f(),B("Post imported successfully!"),a.published&&await L(),await y())}catch(e){c.textContent="Unexpected error: "+e.message,l.classList.remove("hidden"),i.disabled=!1,i.textContent="Confirm Import"}});const y=async()=>{s.innerHTML=`
        <tr class="animate-pulse">
          <td colspan="5" class="px-6 py-12 text-center text-slate-400">Loading blog posts...</td>
        </tr>
      `;const{data:n,error:a}=await C();if(a){console.error("Failed to load posts:",a),s.innerHTML=`
          <tr>
            <td colspan="5" class="px-6 py-12 text-center text-rose-600 font-semibold bg-rose-50/40">Failed to load blog posts.</td>
          </tr>
        `;return}if(!n||n.length===0){s.innerHTML=`
          <tr>
            <td colspan="5" class="px-6 py-12 text-center text-slate-400">
              <div class="flex flex-col items-center justify-center space-y-2">
                <i class="ti ti-folder-off text-2xl text-slate-350"></i>
                <span>No blog posts created yet.</span>
              </div>
            </td>
          </tr>
        `;return}s.innerHTML=n.map(e=>{const g=e.updated_at?new Date(e.updated_at).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}):"N/A",d=e.published?'<span class="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100">Published</span>':'<span class="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-slate-150 text-slate-500 border border-slate-200/50">Draft</span>',_=e.published?"Unpublish":"Publish";return`
          <tr class="hover:bg-slate-50/70 transition-colors">
            <td class="px-6 py-4 text-slate-900 font-semibold max-w-sm truncate">${e.title}</td>
            <td class="px-6 py-4 text-slate-655 font-medium">${e.category||"Uncategorized"}</td>
            <td class="px-6 py-4">${d}</td>
            <td class="px-6 py-4 text-slate-450">${g}</td>
            <td class="px-6 py-4 text-right space-x-1.5 shrink-0 whitespace-nowrap">
              <button 
                data-action="toggle-publish" 
                data-id="${e.id}" 
                data-title="${e.title}"
                data-published="${e.published}"
                class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition cursor-pointer"
              >
                ${_}
              </button>
              <a 
                href="/blog/edit/?id=${e.id}"
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
        `}).join("")};s.addEventListener("click",async n=>{const e=n.target.closest("button");if(!e)return;const g=e.getAttribute("data-action"),d=e.getAttribute("data-id")||"",_=e.getAttribute("data-title")||"";if(g==="delete"&&confirm(`Are you sure you want to delete the blog post "${_}"?`)){e.disabled=!0,e.textContent="Deleting...";const{error:u}=await I(d);u?(alert("Failed to delete post: "+u.message),e.disabled=!1,e.textContent="Delete"):await y()}if(g==="toggle-publish"){const u=e.getAttribute("data-published")==="true";e.disabled=!0,e.textContent=u?"Unpublishing...":"Publishing...";const{error:w}=await N({published:!u},d);w?(alert("Failed to update status: "+w.message),e.disabled=!1,e.textContent=u?"Unpublish":"Publish"):(u||await L(),await y())}}),await y()});
