// Catálogo editorial. Preencha category após confirmar a origem do título.
// Para publicar um vídeo, coloque o arquivo em public/videos e preencha video com /videos/arquivo.mp4.
const dramas = [
 {id:1,title:'A Vida Dupla de um Bilionário',image:'dorama-1.jpg',description:'Uma vida, duas identidades e segredos que podem mudar tudo.'},
 {id:3,title:'De Repente Casados',image:'dorama-3.jpeg',description:'Um casamento inesperado. Um novo começo cheio de possibilidades.'},
 {id:5,title:'Marido Pobre Era Bilionário',image:'dorama-5.jpg',description:'Amor e aparências se encontram em uma história de identidade secreta.'},
 {id:6,title:'Me Derrubou e Se Apaixonou',image:'dorama-6.png',description:'Um encontro fora dos planos pode ser o início de uma paixão.'},
 {id:7,title:'Minha Esposa Mendiga É uma Lenda',image:'dorama-7.jpg',description:'Por trás das aparências, uma mulher com uma história surpreendente.'},
 {id:8,title:'O Herdeiro de Seis Anos',image:'dorama-8.png',description:'Um pequeno herdeiro no centro de uma grande história.'},
 {id:2,title:'Bebezita, Sou Eu a Verdadeira Princesa',image:'dorama-2.png',description:'Uma verdadeira princesa e uma identidade que merece ser descoberta.'},
 {id:9,title:'O Rei Lobo Oculto: Híbrido Fracassado',image:'dorama-9.jpeg',description:'Entre lobos e segredos, uma jornada de poder e transformação.'},
 {id:10,title:'Punhos de Aço',image:'dorama-10.jpeg',description:'Uma história de luta, coragem e força para seguir em frente.'},
 {id:11,title:'Recuperando Nossas Melodias',image:'dorama-11.jpeg',description:'Melodias, sentimentos e a possibilidade de um reencontro.'},
 {id:12,title:'Rejeitada, mas Reivindicada pelo Alfa Implacável',image:'dorama-12.jpg',description:'Rejeição e destino se cruzam em um romance de alfas.'},
 {id:4,title:'Domador Supremo: A Evolução ao Contrário',image:'dorama-4.jpg',description:'Uma jornada de evolução, desafios e poderes a descobrir.'},
 {id:13,title:'Sistema de Praga Sombria',image:'dorama-13.jpeg',description:'Um sistema misterioso abre as portas para uma aventura sombria.'}
].map(item => ({...item, category:null,video:null}));
const categories=['Todos','Anime','Asiático','Coreano','Brasileiro','Japonês'];
let selected='Todos';
// Seleção temporária desta página; não registra pedidos nem confirma pagamentos.
const cart = new Set();
const money = cents => (cents / 100).toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
let statusTimer;
function announce(message){
 const status=document.querySelector('#cart-status');
 status.textContent=message;
 clearTimeout(statusTimer);
 statusTimer=setTimeout(()=>{status.textContent='';},3000);
}
function toggleCart(item){
 if(cart.has(item.id)){cart.delete(item.id);announce('Dorama removido do carrinho.');}
 else{cart.add(item.id);announce('Dorama adicionado ao carrinho.');}
 render();renderCart();
}

const filters=document.querySelector('.filters');
for(const category of categories){const button=document.createElement('button');button.className='filter';button.type='button';button.innerHTML='<svg aria-hidden="true"><use href="#folder"/></svg>';button.append(document.createTextNode(category));button.addEventListener('click',()=>{selected=category;render();});button.dataset.category=category;filters.append(button);}
function normalize(value){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
function telegram(item){return 'https://t.me/JessicaDoramasvip?text='+encodeURIComponent('Olá, Jessica! Quero comprar '+item.title+' por R$ 5,00 via Pix, com acesso vitalício.');}
function whatsapp(item){return 'https://wa.me/5534984145389?text='+encodeURIComponent('Olá, Jessica! Quero comprar '+item.title+' por R$ 5,00 via Pix, com acesso vitalício.');}
function render(){
 for(const button of filters.children){const active=button.dataset.category===selected;button.classList.toggle('selected',active);button.setAttribute('aria-pressed',String(active));}
 const query=normalize(document.querySelector('#search').value.trim());
 const results=dramas.filter(item=>(selected==='Todos'||item.category===selected)&&normalize(item.title).includes(query));
 document.querySelector('#count').textContent=results.length+' '+(results.length===1?'título disponível':'títulos disponíveis')+(selected==='Todos'?' · Origens em classificação':' nesta pasta');
 const grid=document.querySelector('#catalog-grid');grid.replaceChildren();
 if(!results.length){const empty=document.createElement('div');empty.className='empty';const strong=document.createElement('strong');strong.textContent=query?'Nenhum dorama encontrado':'Esta pasta está recebendo novas histórias';const p=document.createElement('p');p.textContent=query?'Tente outro título ou escolha outra pasta.':'Os títulos serão organizados aqui após a confirmação de sua origem.';const reset=document.createElement('button');reset.className='btn secondary';reset.textContent='Ver todos os doramas';reset.onclick=()=>{selected='Todos';document.querySelector('#search').value='';render();};const contact=document.createElement('a');contact.className='btn secondary';contact.style.margin='10px';contact.href='https://t.me/JessicaDoramasvip';contact.target='_blank';contact.rel='noopener noreferrer';contact.textContent='Pedir meu dorama no Telegram ↗';const whatsappContact=contact.cloneNode(true);whatsappContact.href='https://wa.me/5534984145389';whatsappContact.textContent='Pedir meu dorama no WhatsApp ↗';empty.append(strong,p,reset,contact,whatsappContact);grid.append(empty);return;}
 for(const item of results){const card=document.createElement('article');card.className='card';card.innerHTML=`<div class="poster"><img src="/assets/${item.image}" alt="Capa de ${item.title}" loading="lazy" width="300" height="400"><span class="tag">ACESSO VITALÍCIO</span><button class="poster-button" type="button" aria-label="Ver detalhes de ${item.title}"><span>Conhecer a história ↗</span></button></div><h3>${item.title}</h3><p>${item.description}</p><div class="card-bottom"><span class="price">R$ 5,00<small>Pagamento único</small></span><a class="buy" href="${telegram(item)}" target="_blank" rel="noopener noreferrer">Comprar ↗</a></div><button type="button" class="btn add-cart" aria-pressed="${cart.has(item.id)}" aria-label="${cart.has(item.id)?'Remover':'Adicionar'} ${item.title} ${cart.has(item.id)?'do':'ao'} carrinho">${cart.has(item.id)?'✓ No carrinho · remover':'+ Adicionar ao carrinho'}</button>`;card.querySelector('button').onclick=()=>openDetails(item,false);card.querySelector('.add-cart').onclick=()=>toggleCart(item);grid.append(card);}
}
const dialog=document.querySelector('#details');
function openDetails(item,preview){document.querySelector('#dialog-title').textContent=item.title;const content=document.querySelector('#dialog-body');content.replaceChildren();const description=document.createElement('p');description.textContent=preview&&!item.video?'O vídeo curto deste dorama ainda não foi publicado. Acompanhe as novidades ou consulte a Jessica pelo Telegram.':item.description;content.append(description);if(preview&&item.video){const video=document.createElement('video');video.controls=true;video.playsInline=true;video.src=item.video;video.className='video';video.onerror=()=>{description.textContent='Não foi possível carregar a prévia. Consulte as novidades no Telegram.';};content.append(video);}const price=document.createElement('div');price.className='modal-price';price.innerHTML='R$ 5,00 <small>Por título · acesso vitalício · pagamento único via Pix</small>';const link=document.createElement('a');link.className='btn';link.href=telegram(item);link.target='_blank';link.rel='noopener noreferrer';link.textContent='Falar com a Jessica no Telegram ↗';const add=document.createElement('button');add.className='btn add-cart';add.textContent=cart.has(item.id)?'✓ No carrinho · remover':'+ Adicionar ao carrinho';add.onclick=()=>{toggleCart(item);dialog.close();};const whatsappLink=document.createElement('a');whatsappLink.className='btn secondary whatsapp-link';whatsappLink.href=whatsapp(item);whatsappLink.target='_blank';whatsappLink.rel='noopener noreferrer';whatsappLink.textContent='Comprar pelo WhatsApp ↗';content.append(price,link,whatsappLink,add);dialog.showModal();}
document.querySelector('.close').onclick=()=>dialog.close();dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});dialog.addEventListener('close',()=>{dialog.querySelector('video')?.pause();});
for(const item of [dramas[1],dramas[4],dramas[7],dramas[3]]){const clip=document.createElement('article');clip.className='clip';clip.innerHTML=`<img src="/assets/${item.image}" alt="" loading="lazy"><button type="button" aria-label="${item.video?'Assistir prévia':'Informações da prévia'} de ${item.title}"><span class="clip-label">${item.video?'Prévia':'Prévia em breve'}</span><span class="play"><svg aria-hidden="true"><use href="#play"/></svg></span><strong>${item.title}</strong><small>${item.video?'Assistir vídeo curto':'Conheça essa história ↗'}</small></button>`;clip.querySelector('button').onclick=()=>openDetails(item,true);document.querySelector('#clips').append(clip);}
document.querySelector('#search').addEventListener('input',render);render();

const cartDialog=document.querySelector('#cart-dialog');
function renderCart(){
 document.querySelector('#cart-count').textContent=cart.size;
 document.querySelector('.cart-toggle').setAttribute('aria-label',`Abrir carrinho, ${cart.size} títulos`);
 const content=document.querySelector('#cart-content');content.replaceChildren();
 if(!cart.size){
  const empty=document.createElement('div');empty.className='cart-empty';
  const text=document.createElement('p');text.textContent='Seu carrinho ainda está vazio. Escolha suas próximas histórias no catálogo.';
  const back=document.createElement('button');back.className='btn';back.textContent='Explorar catálogo';back.onclick=()=>{cartDialog.close();document.querySelector('#catalogo').scrollIntoView();};
  empty.append(text,back);content.append(empty);return;
 }
 const items=dramas.filter(item=>cart.has(item.id));
 const list=document.createElement('ul');list.className='cart-items';
 for(const item of items){
  const row=document.createElement('li');row.className='cart-item';
  const image=document.createElement('img');image.src='/assets/'+item.image;image.alt='';
  const title=document.createElement('strong');title.textContent=item.title;
  const remove=document.createElement('button');remove.className='cart-remove';remove.type='button';remove.textContent='Remover';remove.setAttribute('aria-label','Remover '+item.title+' do carrinho');
  remove.onclick=()=>{const index=items.findIndex(entry=>entry.id===item.id);toggleCart(item);const remaining=content.querySelectorAll('.cart-remove');(remaining[Math.min(index,remaining.length-1)]||content.querySelector('button'))?.focus();};
  row.append(image,title,remove);list.append(row);
 }
 const pricing=calculateCart(items.length);
 const summary=document.createElement('div');summary.className='cart-summary';
 summary.innerHTML=`<p><span>${items.length} título${items.length===1?'':'s'} · valor avulso</span><span>${money(pricing.subtotal)}</span></p>${pricing.discount?`<p class="saving"><span>Oferta de ${pricing.groups} trio${pricing.groups===1?'':'s'}</span><span>− ${money(pricing.discount)}</span></p>`:''}<p class="total"><strong>Total</strong><strong>${money(pricing.total)}</strong></p>`;
 const hint=document.createElement('p');hint.className='cart-hint';
 const needed=3-items.length%3;
 hint.textContent=items.length%3?`Adicione mais ${needed} dorama${needed===1?'':'s'} para completar outro trio por R$ 11,00.`:'Oferta de três doramas aplicada! Todos os títulos têm acesso vitalício.';
 const message=['Olá, Jessica! Quero comprar estes doramas:',...items.map((item,index)=>`${index+1}. ${item.title}`),'',`Valor avulso: ${money(pricing.subtotal)}`,`Desconto: ${money(pricing.discount)}`,`Total: ${money(pricing.total)}`,pricing.groups?`Oferta: ${pricing.groups} trio(s) por R$ 11,00 cada.`:'','Pagamento via Pix, com acesso vitalício. Como posso pagar?'].filter(Boolean).join('\n');
 const checkout=document.createElement('a');checkout.className='btn cart-checkout';checkout.href='https://t.me/JessicaDoramasvip?text='+encodeURIComponent(message);checkout.target='_blank';checkout.rel='noopener noreferrer';checkout.textContent='Enviar pedido pelo Telegram ↗';
 const whatsappCheckout=checkout.cloneNode(true);whatsappCheckout.className='btn cart-checkout whatsapp-checkout';whatsappCheckout.href='https://wa.me/5534984145389?text='+encodeURIComponent(message);whatsappCheckout.textContent='Enviar pedido pelo WhatsApp ↗';
 const alternative=document.createElement('p');alternative.className='cart-hint';alternative.textContent='Não tem Telegram? Envie o mesmo pedido pelo WhatsApp: (34) 98414-5389.';
 const note=document.createElement('p');note.className='cart-hint';note.textContent='O pagamento via Pix é combinado com a Jessica no Telegram ou WhatsApp. Sua seleção vale enquanto esta página estiver aberta.';
 content.append(list,summary,hint,checkout,alternative,whatsappCheckout,note);
}
document.querySelector('.cart-toggle').onclick=()=>{renderCart();cartDialog.showModal();};
cartDialog.querySelector('.close').onclick=()=>cartDialog.close();
cartDialog.addEventListener('click',event=>{if(event.target!==cartDialog)return;const rect=cartDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)cartDialog.close();});
renderCart();
