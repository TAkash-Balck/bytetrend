import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const data = [
  { title: "How to Speed Up Your Android Phone in 5 Minutes", slug:"speed-up-android-phone", excerpt:"Quick wins...", content:"<h2>Clear Cache</h2><p>...</p>", status:"PUBLISHED" },
  { title: "Windows 11 Privacy Settings You Should Change Today", slug:"windows-11-privacy-settings", excerpt:"Take control...", content:"<h2>Turn Off Advertising ID</h2><p>...</p>", status:"PUBLISHED" }
];
async function main(){ for(const d of data){ await prisma.post.upsert({ where:{ slug:d.slug }, update:d, create:d }); } console.log('seeded'); }
main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1);});
