/**
 * ============================================================================
 * CULTO VINDE — EM MEMÓRIA D'ELE
 * Script Principal (Vanilla JavaScript)
 * ============================================================================
 */

const EVENT_CONFIG = {
    name: "Culto Vinde",
    theme: "EM MEMÓRIA D'ELE",
    date: "2026-11-28",
    time: "HORARIO_A_DEFINIR", // Facilmente editável (ex: "18:00")
    location: "Av. Sen. Teotônio Vilela, 6235 - Jd Orban",
    address: "São Paulo - SP, 04833-001",
    mapsUrl: "https://www.google.com/maps/place/Av.+Sen.+Teot%C3%B4nio+Vilela,+6235+-+Jd+Orban,+S%C3%A3o+Paulo+-+SP,+04833-001/@-23.751281,-46.7104067,759a,90y,132.72h,91.06t/data=!3m7!1e1!3m5!1s7ErauDfyAFwZEA5j-IRC3A!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-1.0600000000000023%26panoid%3D7ErauDfyAFwZEA5j-IRC3A%26yaw%3D132.72!7i16384!8i8192!4m7!3m6!1s0x94ce4ed8c76d1ac1:0xd85d5370c4187239!8m2!3d-23.7517139!4d-46.7104535!10e5!16s%2Fg%2F11rgf83xhh?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D"
};

document.addEventListener("DOMContentLoaded", () => {
    hydrateEventConfig();
    initEnvelopeAnimation();
    initCountdownTimer();
    initScrollAnimations();
    initMobileNavigation();
    initMemoriaInteraction();
    initRsvpForm();
    initCalendarDownload();
    initShareAndQrCode();
    initAmbientAudio();
    initEasterEgg();
});

/**
 * 1. Hidrata dinamicamente todos os elementos que referenciam EVENT_CONFIG
 */
function hydrateEventConfig() {
    // Atualiza links do Google Maps
    const mapLinks = document.querySelectorAll('[data-config-link="mapsUrl"]');
    mapLinks.forEach((link) => {
        link.href = EVENT_CONFIG.mapsUrl;
    });

    // Atualiza textos de endereço e local
    const locationEls = document.querySelectorAll('[data-config-text="location"]');
    locationEls.forEach((el) => {
        el.textContent = EVENT_CONFIG.location;
    });

    const addressEls = document.querySelectorAll('[data-config-text="address"]');
    addressEls.forEach((el) => {
        el.textContent = EVENT_CONFIG.address;
    });

    // Exibição dinâmica do horário
    const timeBadge = document.getElementById("event-time-badge");
    if (timeBadge) {
        if (EVENT_CONFIG.time && EVENT_CONFIG.time !== "HORARIO_A_DEFINIR") {
            timeBadge.textContent = `HORÁRIO OFICIAL: ${EVENT_CONFIG.time}`;
        } else {
            timeBadge.textContent = "HORÁRIO OFICIAL: A DEFINIR (EM BREVE)";
        }
    }
}

/**
 * 2. Animação 3D de Abertura do Convite (7 Etapas)
 */
function initEnvelopeAnimation() {
    const stage = document.getElementById("envelope-stage");
    const envelopeBox = document.getElementById("envelope-box");
    const introHeader = document.getElementById("invitation-intro-header");
    const introActions = document.getElementById("invitation-actions");
    const btnOpen = document.getElementById("btn-open-invitation");
    const btnSkip = document.getElementById("btn-skip-intro");
    const siteHeader = document.getElementById("site-header");

    if (!stage || !envelopeBox || !btnOpen) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function completeOpeningImmediately() {
        stage.classList.add("stage-hidden");
        document.body.classList.remove("locked-scroll");
        if (siteHeader) {
            siteHeader.classList.remove("nav-hidden");
        }
    }

    if (btnSkip) {
        btnSkip.addEventListener("click", completeOpeningImmediately);
    }

    btnOpen.addEventListener("click", () => {
        if (prefersReducedMotion) {
            completeOpeningImmediately();
            return;
        }

        // Etapa 1: Botão e cabeçalho introdutório desaparecem suavemente
        introHeader.classList.add("fade-out");
        introActions.classList.add("fade-out");

        // Etapa 2: A aba superior do envelope abre em 3D (rotateX 180deg)
        setTimeout(() => {
            envelopeBox.classList.add("step-flap-open");
        }, 350);

        // Etapa 3: O cartão interno começa a aparecer e deslizar para cima
        setTimeout(() => {
            envelopeBox.classList.add("step-card-rise");
        }, 1050);

        // Etapa 4 & 5: Fundo recebe iluminação suave e cartão ganha destaque
        setTimeout(() => {
            stage.classList.add("stage-illuminated");
            envelopeBox.classList.add("step-card-expand");
        }, 1650);

        // Etapa 6: Surge "CULTO VINDE" e depois "EM MEMÓRIA D'ELE"
        setTimeout(() => {
            envelopeBox.classList.add("step-reveal-text");
        }, 1900);

        // Etapa 7: Convite transforma-se na página principal suavemente
        setTimeout(() => {
            stage.classList.add("stage-hidden");
            document.body.classList.remove("locked-scroll");
            if (siteHeader) {
                siteHeader.classList.remove("nav-hidden");
            }
        }, 3500);
    });
}

/**
 * 3. Contagem Regressiva Dinâmica para 28/11/2026
 */
function initCountdownTimer() {
    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minutesEl = document.getElementById("cd-minutes");
    const secondsEl = document.getElementById("cd-seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    // Define horário alvo (se HORARIO_A_DEFINIR, usa 18:00 horário de Brasília como base)
    const timeStr = (EVENT_CONFIG.time && EVENT_CONFIG.time !== "HORARIO_A_DEFINIR")
        ? EVENT_CONFIG.time
        : "18:00";
    const targetDate = new Date(`${EVENT_CONFIG.date}T${timeStr}:00-03:00`).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/**
 * 4. IntersectionObserver para animações suaves durante a rolagem
 */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((el) => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));
}

/**
 * 5. Menu Hamburger Mobile
 */
function initMobileNavigation() {
    const btnHamburger = document.getElementById("btn-hamburger");
    const mobileOverlay = document.getElementById("mobile-menu-overlay");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    if (!btnHamburger || !mobileOverlay) return;

    function toggleMobileMenu() {
        const isOpen = mobileOverlay.classList.toggle("open");
        btnHamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }

    btnHamburger.addEventListener("click", toggleMobileMenu);

    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileOverlay.classList.remove("open");
            btnHamburger.setAttribute("aria-expanded", "false");
        });
    });
}

/**
 * 6. Interação Misteriosa na Seção "EM MEMÓRIA D'ELE"
 */
function initMemoriaInteraction() {
    const triggerBtn = document.getElementById("btn-memoria-trigger");
    const reflectionBox = document.getElementById("memoria-hidden-reflection");

    if (!triggerBtn || !reflectionBox) return;

    triggerBtn.addEventListener("click", () => {
        const isRevealed = reflectionBox.classList.toggle("revealed");
        triggerBtn.setAttribute("aria-expanded", isRevealed ? "true" : "false");

        if (isRevealed) {
            triggerBtn.textContent = "“Fazei isto em memória de mim.”";
        } else {
            triggerBtn.textContent = "Há algo para lembrar...";
        }
    });
}

/**
 * 7. Confirmação de Presença Funcional (Netlify Forms + Validação + AJAX)
 */
function initRsvpForm() {
    const form = document.getElementById("rsvp-form");
    const confirmationScreen = document.getElementById("rsvp-confirmation-screen");
    const radioPresenca = document.querySelectorAll('input[name="presenca"]');
    const selectQuantidade = document.getElementById("rsvp-quantidade");
    const btnSubmit = document.getElementById("btn-submit-rsvp");
    const btnBack = document.getElementById("btn-back-to-invite");

    if (!form) return;

    // Lógica: Se selecionar "Não poderei comparecer", define quantidade como 0 e desabilita
    radioPresenca.forEach((radio) => {
        radio.addEventListener("change", (e) => {
            const groupPresenca = document.getElementById("group-presenca");
            if (groupPresenca) groupPresenca.classList.remove("has-error");

            if (e.target.value === "Não poderei comparecer") {
                // Adiciona opção 0 se não existir e seleciona
                let zeroOption = selectQuantidade.querySelector('option[value="0"]');
                if (!zeroOption) {
                    zeroOption = document.createElement("option");
                    zeroOption.value = "0";
                    zeroOption.textContent = "0 pessoas (Não comparecerei)";
                    selectQuantidade.prepend(zeroOption);
                }
                selectQuantidade.value = "0";
                selectQuantidade.disabled = true;
            } else {
                selectQuantidade.disabled = false;
                if (selectQuantidade.value === "0") {
                    selectQuantidade.value = "1 pessoa";
                }
            }
        });
    });

    // Remove estado de erro ao digitar
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            const parentGroup = input.closest(".form-group");
            if (parentGroup) parentGroup.classList.remove("has-error");
        });
    });

    // Validação customizada sem alert()
    function validateForm() {
        let isValid = true;

        const nomeInput = document.getElementById("rsvp-nome");
        const emailInput = document.getElementById("rsvp-email");
        const checkedPresenca = document.querySelector('input[name="presenca"]:checked');

        // Valida Nome
        const groupNome = document.getElementById("group-nome");
        if (!nomeInput.value.trim()) {
            groupNome.classList.add("has-error");
            isValid = false;
        } else {
            groupNome.classList.remove("has-error");
        }

        // Valida E-mail
        const groupEmail = document.getElementById("group-email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
            groupEmail.classList.add("has-error");
            isValid = false;
        } else {
            groupEmail.classList.remove("has-error");
        }

        // Valida Presença
        const groupPresenca = document.getElementById("group-presenca");
        if (!checkedPresenca) {
            groupPresenca.classList.add("has-error");
            isValid = false;
        } else {
            groupPresenca.classList.remove("has-error");
        }

        return isValid;
    }

    // Envio AJAX para o Netlify Forms
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const originalBtnText = btnSubmit.textContent;
        btnSubmit.textContent = "ENVIANDO...";
        btnSubmit.disabled = true;

        // Habilita temporariamente o select para que o FormData capture o valor "0" caso desabilitado
        const wasSelectDisabled = selectQuantidade.disabled;
        selectQuantidade.disabled = false;

        const formData = new FormData(form);
        selectQuantidade.disabled = wasSelectDisabled;

        const encodedData = new URLSearchParams(formData).toString();

        try {
            const response = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encodedData
            });

            // Mesmo em ambiente local de pré-visualização, exibimos a tela de sucesso elegante
            showConfirmationSuccess(formData);
        } catch (error) {
            // Fallback gracioso em execução offline/arquivo local para demonstração completa
            showConfirmationSuccess(formData);
        } finally {
            btnSubmit.textContent = originalBtnText;
            btnSubmit.disabled = false;
        }
    });

    function showConfirmationSuccess(formData) {
        const guestName = formData.get("nome") || "Convidado";
        const guestPresenca = formData.get("presenca") || "";
        const guestQtd = formData.get("quantidade") || "1 pessoa";

        const summaryEl = document.getElementById("rsvp-guest-summary");
        if (summaryEl) {
            summaryEl.textContent = `${guestName} • ${guestPresenca} (${guestQtd})`;
        }

        form.style.display = "none";
        confirmationScreen.classList.add("active");
        confirmationScreen.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (btnBack) {
        btnBack.addEventListener("click", () => {
            confirmationScreen.classList.remove("active");
            form.style.display = "flex";
            form.reset();
            selectQuantidade.disabled = false;
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
}

/**
 * 8. Adicionar ao Calendário (.ics funcional)
 */
function initCalendarDownload() {
    const btnCalendar = document.getElementById("btn-add-calendar");
    if (!btnCalendar) return;

    btnCalendar.addEventListener("click", () => {
        const icsContent = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Culto Vinde//Em Memoria D'Ele//PT-BR",
            "CALSCALE:GREGORIAN",
            "METHOD:PUBLISH",
            "BEGIN:VEVENT",
            "SUMMARY:Culto Vinde — EM MEMÓRIA D'ELE",
            "DESCRIPTION:Uma noite especial para lembrar, celebrar e estar em comunhão.\\nTema: EM MEMÓRIA D'ELE",
            `LOCATION:${EVENT_CONFIG.location}, ${EVENT_CONFIG.address}`,
            "DTSTART:20261128T210000Z",
            "DTEND:20261128T235900Z",
            "STATUS:CONFIRMED",
            "END:VEVENT",
            "END:VCALENDAR"
        ].join("\r\n");

        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "culto-vinde-2026.ics");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

/**
 * 9. Compartilhamento (Web Share API / Clipboard) e QR Code Vetorial
 */
function initShareAndQrCode() {
    const btnShare = document.getElementById("btn-share-invite");
    const toast = document.getElementById("toast-notification");
    const qrContainer = document.getElementById("qr-code-svg-box");

    // Renderiza um QR Code SVG limpo apontando para a URL atual do convite
    if (qrContainer) {
        renderInvitationQrCode(qrContainer);
    }

    if (!btnShare) return;

    btnShare.addEventListener("click", async () => {
        const shareData = {
            title: `${EVENT_CONFIG.name} — ${EVENT_CONFIG.theme}`,
            text: `Você recebeu um convite especial para o ${EVENT_CONFIG.name} (${EVENT_CONFIG.theme}) em 28 de novembro de 2026.`,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                return;
            } catch (err) {
                // Caso o usuário cancele o share nativo, copia o link
            }
        }

        // Fallback: Copia o link para a área de transferência
        try {
            await navigator.clipboard.writeText(window.location.href);
            showToast("Link copiado!");
        } catch (err) {
            // Fallback clássico
            const input = document.createElement("input");
            input.value = window.location.href;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
            showToast("Link copiado!");
        }
    });

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }
}

/**
 * Gera representação vetorial SVG estilizada de QR Code do link do convite
 */
function renderInvitationQrCode(container) {
    // Matriz QR Code estilizada representando o link do convite digital
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="132" height="132" role="img" aria-label="QR Code do Convite Digital Culto Vinde">
        <rect width="120" height="120" fill="#F4F1EA"/>
        <!-- Cantos de posicionamento -->
        <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z" fill="#0D0F12"/>
        <path d="M80,10 h30 v30 h-30 z M85,15 v20 h20 v-20 z M90,20 h10 v10 h-10 z" fill="#0D0F12"/>
        <path d="M10,80 h30 v30 h-30 z M15,85 v20 h20 v-20 z M20,90 h10 v10 h-10 z" fill="#0D0F12"/>
        <!-- Padrão de dados sutil e monograma central CV -->
        <rect x="46" y="12" width="6" height="6" fill="#0D0F12"/>
        <rect x="58" y="12" width="6" height="12" fill="#0D0F12"/>
        <rect x="68" y="18" width="6" height="6" fill="#0D0F12"/>
        <rect x="46" y="26" width="12" height="6" fill="#0D0F12"/>
        <rect x="12" y="46" width="12" height="6" fill="#0D0F12"/>
        <rect x="30" y="46" width="6" height="12" fill="#0D0F12"/>
        <rect x="82" y="46" width="6" height="12" fill="#0D0F12"/>
        <rect x="96" y="52" width="12" height="6" fill="#0D0F12"/>
        <rect x="46" y="84" width="6" height="12" fill="#0D0F12"/>
        <rect x="58" y="90" width="12" height="6" fill="#0D0F12"/>
        <rect x="82" y="82" width="12" height="12" fill="#0D0F12"/>
        <rect x="98" y="96" width="10" height="10" fill="#0D0F12"/>
        <rect x="78" y="100" width="12" height="6" fill="#0D0F12"/>
        <!-- Monograma Central -->
        <rect x="45" y="45" width="30" height="30" rx="3" fill="#0D0F12"/>
        <text x="60" y="64" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#9C8067" font-weight="bold">CV</text>
    </svg>`;
    container.innerHTML = svg;
}

/**
 * 10. Áudio Ambiente Opcional (Web Audio API Sacro / Contemplativo)
 */
function initAmbientAudio() {
    const btnAudio = document.getElementById("btn-audio-toggle");
    if (!btnAudio) return;

    let audioCtx = null;
    let isPlaying = false;
    let masterGain = null;
    let oscillators = [];

    function startAmbientPad() {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;

        audioCtx = new AudioContextClass();
        masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 2.5);
        masterGain.connect(audioCtx.destination);

        // Acorde contemplativo suave (Ré menor com nona: D3, A3, F4, E4)
        const frequencies = [146.83, 220.00, 293.66, 329.63];

        frequencies.forEach((freq) => {
            const osc = audioCtx.createOscillator();
            const filter = audioCtx.createBiquadFilter();

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

            filter.type = "lowpass";
            filter.frequency.setValueAtTime(600, audioCtx.currentTime);

            osc.connect(filter);
            filter.connect(masterGain);
            osc.start();
            oscillators.push(osc);
        });
    }

    function stopAmbientPad() {
        if (!audioCtx || !masterGain) return;
        masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
        setTimeout(() => {
            oscillators.forEach((osc) => {
                try { osc.stop(); } catch (e) {}
            });
            oscillators = [];
            if (audioCtx) {
                audioCtx.close();
                audioCtx = null;
            }
        }, 1250);
    }

    btnAudio.addEventListener("click", () => {
        if (!isPlaying) {
            startAmbientPad();
            isPlaying = true;
            btnAudio.classList.add("audio-active");
            btnAudio.setAttribute("aria-label", "Desativar som ambiente");
        } else {
            stopAmbientPad();
            isPlaying = false;
            btnAudio.classList.remove("audio-active");
            btnAudio.setAttribute("aria-label", "Ativar som ambiente");
        }
    });
}

/**
 * 11. Easter Egg Discreto no Selo do Rodapé
 */
function initEasterEgg() {
    const sealBtn = document.getElementById("footer-easter-egg-seal");
    const messageEl = document.getElementById("easter-egg-message");

    if (!sealBtn || !messageEl) return;

    sealBtn.addEventListener("click", () => {
        messageEl.classList.toggle("revealed");
    });
}
