/**
 * Яндекс Метрика. Счётчик включается, когда задан NEXT_PUBLIC_YM_ID (Vercel → Environment Variables).
 * Цели вызываются через trackGoal() (src/lib/analytics.ts).
 */
export default function Metrika() {
  const id = process.env.NEXT_PUBLIC_YM_ID;
  if (!id || !/^\d+$/.test(id)) return null;
  const code = `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${id},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false});`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: code }} />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div><img src={`https://mc.yandex.ru/watch/${id}`} style={{ position: 'absolute', left: '-9999px' }} alt="" /></div>
      </noscript>
    </>
  );
}
