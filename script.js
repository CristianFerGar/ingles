// Lista de palabras y traducciones para los ejercicios
const words = {
    "-ment": [
        { base: "move", full: "movement", translation: "movimiento" },
        { base: "achieve", full: "achievement", translation: "logro" },
        { base: "improve", full: "improvement", translation: "mejora" },
        { base: "enjoy", full: "enjoyment", translation: "disfrute" },
        { base: "pay", full: "payment", translation: "pago" }
    ],
    "-ion": [
        { base: "educate", full: "education", translation: "educación" },
        { base: "invent", full: "invention", translation: "invención" },
        { base: "create", full: "creation", translation: "creación" },
        { base: "solve", full: "solution", translation: "solución" },
        { base: "confuse", full: "confusion", translation: "confusión" }
    ],
    "-ence": [
        { base: "differ", full: "difference", translation: "diferencia" },
        { base: "confident", full: "confidence", translation: "confianza" },
        { base: "patient", full: "patience", translation: "paciencia" },
        { base: "absent", full: "absence", translation: "ausencia" },
        { base: "intelligent", full: "intelligence", translation: "inteligencia" }
    ]
};

// Función para generar tarjetas de memoria (flashcards)
function generateFlashcards() {
    const flashcardContainer = document.getElementById("flashcards");
    Object.keys(words).forEach(suffix => {
        words[suffix].forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card", "shadow-sm", "p-3", "mb-2");
            card.innerText = `${item.base} ➔ ${item.full} (${item.translation})`;
            flashcardContainer.appendChild(card);
        });
    });
}

// Función para generar el ejercicio de completar la palabra con la terminación correcta
function generateCompleteExercise() {
    const completeContainer = document.getElementById("complete-exercise");
    Object.keys(words).forEach(suffix => {
        words[suffix].forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card", "shadow-sm", "p-3");

            const questionText = document.createElement("p");
            questionText.innerHTML = `${item.base}______ `;
            card.appendChild(questionText);

            const inputGroup = document.createElement("div");
            inputGroup.classList.add("input-group");

            const input = document.createElement("input");
            input.type = "text";
            input.classList.add("form-control");
            input.placeholder = "Completa con la palabra completa";
            inputGroup.appendChild(input);

            const button = document.createElement("button");
            button.innerText = "Verificar";
            button.classList.add("btn", "btn-primary");

            const translationText = document.createElement("p");
            translationText.classList.add("translation-text", "text-success", "mt-2");
            translationText.style.display = "none"; // Oculto hasta la respuesta correcta
            translationText.innerText = item.translation;

            button.addEventListener("click", () => {
                if (input.value.toLowerCase() === item.full.toLowerCase()) {
                    questionText.innerHTML = `${item.base}<strong>${item.full.slice(item.base.length)}</strong>`;
                    input.disabled = true;
                    button.classList.add("btn-success");
                    translationText.style.display = "block"; // Mostrar traducción en español
                } else {
                    button.classList.add("btn-danger");
                    input.classList.add("is-invalid");
                }
            });
            inputGroup.appendChild(button);

            card.appendChild(inputGroup);
            card.appendChild(translationText);
            completeContainer.appendChild(card);
        });
    });
}

// Función para generar el ejercicio de selección de la palabra correcta
function generateSelectionExercise() {
    const selectionContainer = document.getElementById("selection-exercise");
    Object.keys(words).forEach(suffix => {
        words[suffix].forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card", "shadow-sm", "p-3");

            const questionText = document.createElement("p");
            questionText.innerText = `¿Cuál es la forma completa de "${item.base}"?`;
            card.appendChild(questionText);

            const correctAnswer = item.full;
            const options = [correctAnswer];

            while (options.length < 3) {
                const randomSuffix = Object.keys(words)[Math.floor(Math.random() * 3)];
                const randomWord = words[randomSuffix][Math.floor(Math.random() * words[randomSuffix].length)];
                if (!options.includes(randomWord.full)) options.push(randomWord.full);
            }

            options.sort(() => Math.random() - 0.5);

            const translationText = document.createElement("p");
            translationText.classList.add("translation-text", "text-success", "mt-2");
            translationText.style.display = "none"; // Oculto hasta respuesta correcta
            translationText.innerText = item.translation;

            options.forEach(option => {
                const button = document.createElement("button");
                button.innerText = option;
                button.classList.add("btn", "btn-outline-primary", "btn-sm", "m-1");
                button.addEventListener("click", () => {
                    if (option === correctAnswer) {
                        questionText.innerHTML = `La forma completa de "${item.base}" es "<strong>${correctAnswer}</strong>".`;
                        button.classList.remove("btn-outline-primary");
                        button.classList.add("btn-success");
                        button.disabled = true;
                        translationText.style.display = "block"; // Mostrar traducción en español
                    } else {
                        button.classList.remove("btn-outline-primary");
                        button.classList.add("btn-danger");
                        button.disabled = true;
                    }
                });
                card.appendChild(button);
            });

            card.appendChild(translationText);
            selectionContainer.appendChild(card);
        });
    });
}

// Ejercicio de selección en texto largo
function generateTextSelectionExercise() {
    const textSelectionContainer = document.getElementById("text-selection-exercise");

    const sentences = [
        {
            text: "The ___ of the project was a major milestone for the company, leading to new opportunities for growth and development.",
            options: ["move", "movement"],
            answer: "movement",
            translation: "El movimiento del proyecto fue un hito importante para la empresa, lo que llevó a nuevas oportunidades de crecimiento y desarrollo."
        },
        {
            text: "Her strong sense of ___ allowed her to present her ideas convincingly and win over the audience.",
            options: ["confidence", "confident"],
            answer: "confidence",
            translation: "Su fuerte sentido de confianza le permitió presentar sus ideas de manera convincente y ganarse al público."
        }
        // Agrega más oraciones aquí si es necesario
    ];

    sentences.forEach(sentence => {
        const card = document.createElement("div");
        card.classList.add("card", "shadow-sm", "p-3", "mb-2");

        const questionText = document.createElement("p");
        questionText.innerHTML = sentence.text.replace("___", "<span class='blank'>______</span>");
        card.appendChild(questionText);

        const translationText = document.createElement("p");
        translationText.classList.add("translation-text", "text-success", "mt-2");
        translationText.style.display = "none"; // Oculto hasta que se muestre la respuesta correcta
        translationText.innerText = sentence.translation;

        sentence.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("btn", "btn-outline-primary", "btn-sm", "m-1");
            button.addEventListener("click", () => {
                const blank = card.querySelector(".blank");
                if (option === sentence.answer) {
                    blank.innerText = option;
                    blank.style.fontWeight = "bold";
                    button.classList.remove("btn-outline-primary");
                    button.classList.add("btn-success");
                    button.disabled = true;
                    translationText.style.display = "block"; // Mostrar traducción en español
                } else {
                    button.classList.remove("btn-outline-primary");
                    button.classList.add("btn-danger");
                    button.disabled = true;
                }
            });
            card.appendChild(button);
        });

        card.appendChild(translationText);
        textSelectionContainer.appendChild(card);
    });
}

// Inicializar los ejercicios
generateFlashcards();
generateCompleteExercise();
generateSelectionExercise();
generateTextSelectionExercise();
