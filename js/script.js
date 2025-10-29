// -------------------------------------------
//  MÓDULO 1: CHAT
// -------------------------------------------

const ModChat = (function() {

    function send(msg) {
        console.log("Mensagem enviada:", msg)
    }

    function init() {
        console.log("Chat iniciado")
    }

    return {
        init: init,
        send: send
    }

})()

// -------------------------------------------
//  MÓDULO 2: SISTEMA DE TEMPLATES
// -------------------------------------------

const ModTemplates = (function() {

    var projetos = [
        { titulo: "Reconstrução no Sul", descricao: "Restauração de casas...", imagem: "../media/projeto-reconstrucao.jpg", tag: "Reconstrução", link: "projetos.html#reconstrucao" },
        { titulo: "Resgate Animal Urbano", descricao: "Resgate e cuidados veterinários...", imagem: "../media/projeto-resgate-animal.jpg", tag: "Veterinária", link: "projetos.html#animal" },
        { titulo: "Apoio Psicológico Móvel", descricao: "Suporte emocional imediato...", imagem: "../media/projeto-psicologico.jpg", tag: "Humanitário", link: "projetos.html#apoio" }
    ]

    function montarCard(p) {
        return '<article class="card-projeto">' +
               '<img src="' + p.imagem + '" alt="' + p.titulo + '">' +
               '<div class="card-conteudo">' +
               '<span class="tag-projeto">' + p.tag + '</span>' +
               '<h3>' + p.titulo + '</h3>' +
               '<p>' + p.descricao + '</p>' +
               '<a href="' + p.link + '" class="link-saibamais">Saiba mais</a>' +
               '</div></article>'
    }

    function init() {
        var container = document.querySelector('#projetos-container')
        if (!container) return
        var html = ''
        for (var i=0; i<projetos.length; i++) {
            html += montarCard(projetos[i])
        }
        container.innerHTML = html
    }

    return { init: init }

})()

// -------------------------------------------
//  MÓDULO 3: GRÁFICOS DE TRANSPARÊNCIA
// -------------------------------------------

const ModGraficos = (function() {

    function init() {
        var corFonte = "white"

        var ctx1 = document.getElementById("distribuicao-recursos")
        var ctx2 = document.getElementById("evolucao-voluntarios")

        if (ctx1) {
            new Chart(ctx1, {
                type: "doughnut",
                data: {
                    labels: ["Ações Diretas", "Custos Operacionais"],
                    datasets: [{ data: [85,15], backgroundColor:["#36A2EB","#FFCE56"] }]
                },
                options: {
                    plugins: { legend: { labels: { color: corFonte } }, title: { display:true, text:"Distribuição de Recursos", color:corFonte } }
                }
            })
        }

        if (ctx2) {
            new Chart(ctx2, {
                type: "line",
                data: {
                    labels: ["2020","2021","2022","2023","2024"],
                    datasets: [{ label:"Voluntários", data:[120,250,400,650,900], borderColor:"#4BC0C0", backgroundColor:"rgba(75,192,192,0.2)", fill:true, tension:0.3 }]
                },
                options: {
                    plugins: { title:{display:true,text:"Crescimento de Voluntários", color:corFonte}, legend:{labels:{color:corFonte}} },
                    scales: {
                        y:{ ticks:{color:corFonte}, grid:{color:"rgba(255,255,255,0.2)"} },
                        x:{ ticks:{color:corFonte}, grid:{color:"rgba(255,255,255,0.2)"} }
                    }
                }
            })
        }
    }

    return { init: init }

})()

// -------------------------------------------
//  MÓDULO 4: PLAYER DE ÁUDIO
// -------------------------------------------

const ModAudio = (() => {
    const audioId = 'meuPodcast'
    const btnSel = '.play-button'
    let audio, btn

    function playPause() {
        if (!audio) return
        if (audio.paused) {
            audio.play()
            btn.textContent = '⏸️'
        } else {
            audio.pause()
            btn.textContent = '▶️'
        }
    }

    function reset() {
        btn.textContent = '▶️'
    }

    function init() {
        audio = document.getElementById(audioId)
        btn = document.querySelector(btnSel)
        if (!audio || !btn) return
        btn.addEventListener('click', playPause)
        audio.addEventListener('ended', reset)
        // atualiza o botão conforme estado inicial
        btn.textContent = audio.paused ? '▶️' : '⏸️'
    }

    return { init }
})()


// -------------------------------------------
//  MÓDULO 5: API DE CEP
// -------------------------------------------

const ModCEP = (function() {

    async function buscar(cep) {
        var c = cep.replace(/\D/g,'')
        if (c.length !== 8) return { erro:true, mensagem:"CEP inválido" }

        try {
            var r = await fetch("https://viacep.com.br/ws/"+c+"/json/")
            if (!r.ok) return { erro:true, mensagem:"Erro "+r.status }
            var d = await r.json()
            if (d.erro) return { erro:true, mensagem:"CEP não encontrado" }
            return { logradouro:d.logradouro, bairro:d.bairro, cidade:d.localidade, uf:d.uf }
        } catch(err) {
            return { erro:true, mensagem:"Falha na conexão" }
        }
    }

    function init() { console.log("CEP pronto") }

    return { init: init, buscar: buscar }

})()

// -------------------------------------------
//  MÓDULO 6: SPA BÁSICO
// -------------------------------------------

const ModSPA = (function() {

    var mainSel = "#main-content"

    function nomeArquivo(url) {
        var u = url.split("?")[0].split("#")[0]
        var m = u.match(/([^/]+\.html)$/i)
        return m ? m[1].toLowerCase() : "index.html"
    }

    async function carregar(url) {
        var main = document.querySelector(mainSel)
        if (!main) return
        try {
            var res = await fetch(url)
            if (!res.ok) throw "erro"
            var html = await res.text()
            var doc = new DOMParser().parseFromString(html, "text/html")
            var novo = doc.querySelector("main")
            if (!novo) throw "erro"
            main.innerHTML = novo.innerHTML
            window.history.pushState(null,"",url)
            iniciarPagina(url)
        } catch(e) {
            window.location.href = url
        }
    }

    function iniciarPagina(url) {
        var n = nomeArquivo(url)
        if (n==="projetos.html") ModTemplates.init()
        if (n==="transparencia.html") ModGraficos.init()
        if (n==="sobre.html") ModAudio.init()
        if (n==="chat.html") ModChat.init()
        if (n==="voluntariado.html") { ModCEP.init(); ModValidacao.init() }
        window.scrollTo(0,0)
    }

    function init() {
        var links = document.querySelectorAll("nav a[href$='.html']")
        for (var i=0; i<links.length; i++) {
            links[i].onclick = function(e) {
                e.preventDefault()
                carregar(this.getAttribute("href"))
            }
        }
        window.onpopstate = function() { carregar(window.location.pathname) }
        iniciarPagina(window.location.href)
    }

    return { init: init }

})()

// -------------------------------------------
//  MÓDULO 7: VALIDAÇÃO DE FORMULÁRIO
// -------------------------------------------

const ModValidacao = (function() {

    var formSel = ".forminscricao"
    var sel = { cep:"#cep", end:"#endereco", bai:"#bairro", cid:"#cidade", uf:"#uf" }

    function erro(el,msg) {
        var box = el.closest("div")
        if (!box) return
        var aviso = box.querySelector(".aviso-erro")
        if (!aviso) {
            aviso = document.createElement("span")
            aviso.className = "aviso-erro"
            box.appendChild(aviso)
        }
        aviso.textContent = msg
        el.classList.add("erro")
    }

    function limparErro(el) {
        el.classList.remove("erro")
        var box = el.closest("div")
        var aviso = box ? box.querySelector(".aviso-erro") : null
        if (aviso) aviso.remove()
    }

    function validar(el) {
        var id = el.id
        var v = el.value.trim()
        limparErro(el)
        if (el.required && v==="") { erro(el,"Campo obrigatório"); return false }
        if (id==="nome" && v.length<5) { erro(el,"Mínimo 5 caracteres"); return false }
        if (id==="email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { erro(el,"E-mail inválido"); return false }
        if (id==="telefone" && v.replace(/\D/g,"").length<10) { erro(el,"Telefone inválido"); return false }
        if (id==="cep" && v.replace(/\D/g,"").length!==8) { erro(el,"CEP inválido"); return false }
        return true
    }

    async function buscarCEP() {
        var cepEl = document.querySelector(sel.cep)
        if (!cepEl) return
        var cep = cepEl.value.replace(/\D/g,"")
        var keys = Object.keys(sel)
        for (var i=0; i<keys.length; i++) {
            var s = sel[keys[i]]
            var inp = document.querySelector(s)
            if (inp && s!==sel.cep) inp.value=""
        }
        limparErro(cepEl)
        if (cep.length===8) {
            var d = await ModCEP.buscar(cep)
            if (d.erro) erro(cepEl,d.mensagem)
            else {
                document.querySelector(sel.end).value = d.logradouro || ""
                document.querySelector(sel.bai).value = d.bairro || ""
                document.querySelector(sel.cid).value = d.cidade || ""
                document.querySelector(sel.uf).value = d.uf || ""
            }
        } else if (cep.length>0 && cep.length<8) {
            erro(cepEl,"CEP deve ter 8 dígitos")
        }
    }

    function enviar(e) {
        e.preventDefault()
        var f = e.target
        var campos = f.querySelectorAll("input[required], select[required], textarea[required]")
        var ok = true
        for (var i=0;i<campos.length;i++) {
            if (!validar(campos[i])) ok=false
        }
        if (ok) { alert("Enviado com sucesso!"); f.reset() }
        else alert("Verifique os campos em vermelho.")
    }

    function init() {
        var f = document.querySelector(formSel)
        if (!f) return
        f.onsubmit = enviar
        var inputs = f.querySelectorAll("input, select, textarea")
        for (var i=0;i<inputs.length;i++) {
            inputs[i].onblur = (function(inp){ return function(){ validar(inp) } })(inputs[i])
        }
        var cepEl = document.querySelector(sel.cep)
        if (cepEl) {
            cepEl.onblur = buscarCEP
            cepEl.oninput = function(e) {
                var v = e.target.value.replace(/\D/g,"").substring(0,8)
                e.target.value = v.length>5 ? v.slice(0,5)+"-"+v.slice(5) : v
            }
        }
    }

    return { init: init }

})()

// -------------------------------------------
//  INICIALIZAÇÃO GLOBAL
// -------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    ModSPA.init()
})
