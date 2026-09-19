"""One-time, read-only source extraction. Curated JSON is the authoring source thereafter."""
import json, re, shutil, hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'amy-grist-astro-starter-docs'
def rows(name):
 return next(x['data'] for x in json.loads((SOURCE/f'exports/wppg_{name}.json').read_text()) if x['type']=='table')
def attrs(s):return dict(re.findall(r'(\w+)="([^"]*)"',s))
def clean(s):
 s=re.sub(r'\s(?:data-[\w-]+|aria-level)="[^"]*"','',s)
 s=s.replace('http://amygrist.com','https://amygrist.com')
 # Only routes delivered in this foundation are local; all other source links remain live.
 s=s.replace('https://amygrist.com/amy/','/amy/')
 return s.strip()
for id,name in [('7','home'),('23','amy')]:
 source=next(r['post_content'] for r in rows('pages') if r['ID']==id)
 sections=[]
 for a,c in re.findall(r'\[vc_row\b([^\]]*)\](.*?)\[/vc_row\]',source,re.S):
  texts=[clean(t) for t in re.findall(r'\[vc_column_text[^\]]*\](.*?)\[/vc_column_text\]',c,re.S)]
  texts=[t for t in texts if '<img ' not in t]
  sections.append({'headings':[attrs(t)['text'] for t in re.findall(r'\[vc_custom_heading ([^\]]*)\]',c)],'texts':texts,'buttons':[attrs(t) for t in re.findall(r'\[nectar_btn ([^\]]*)\]',c)],'testimonials':[attrs(t) for t in re.findall(r'\[testimonial ([^\]]*)\]',c)]})
 (ROOT/f'src/data/{name}.json').write_text(json.dumps(sections,ensure_ascii=False,indent=2)+'\n')
media={}
for r in rows('media_meta'): media.setdefault(r['attachment_id'],{})[r['meta_key']]=r['meta_value']
ids=['544','548','1741','87','281','100','115','1133','1130','419','259','1150','1157','1156','1014']
manifest=[]
for id in ids:
 m=media[id]; path=Path(m['_wp_attached_file']); original=re.search(r's:14:"original_image";s:\d+:"([^"]+)"',m.get('_wp_attachment_metadata',''))
 if original:path=path.parent/original[1]
 assert not re.search(r'-\d+x\d+|-scaled|-rotated',path.name),path
 source=SOURCE/'uploads'/path
 assert source.is_file(),source
 dest=ROOT/'src/assets/images'/path.name
 shutil.copyfile(source,dest)
 manifest.append({'id':int(id),'original':str(path),'asset':str(dest.relative_to(ROOT)),'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'resolution':'original_image metadata' if original else '_wp_attached_file; no original_image override or generated filename'})
(ROOT/'migration/media-originals.json').write_text(json.dumps(manifest,indent=2)+'\n')
(ROOT/'src/data/images.ts').write_text('\n'.join(f"import image{m['id']} from '../assets/images/{Path(m['asset']).name}';" for m in manifest)+'\nexport const images = {'+', '.join(f"{m['id']}: image{m['id']}" for m in manifest)+'};\n')
inv=json.loads((SOURCE/'ROUTE-INVENTORY.json').read_text())
for e in inv['entries']:
 if e['sourceUrl'] in ['/','/amy/']:e['migrationStatus']='implemented-awaiting-verification'
(ROOT/'ROUTE-INVENTORY.json').write_text(json.dumps(inv,ensure_ascii=False,indent=2)+'\n')
