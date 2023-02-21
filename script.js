// Dados iniciais:
let currentQuestion = 0; 
let correctAnswers = 0;

showQuestion();

// Events>
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// Funções:
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100); // Conta para saber a porcentagem do progresso para modificar a barrinha de conclusão (arredondado - math.floor)

        document.querySelector('.progress--bar').style.width = `${pct}%` // Exibir a barra de progresso de acordo com a porcentagem
        
        document.querySelector('.scoreArea').style.display = 'none'; // esconde o scoreArea
        document.querySelector('.questionArea').style.display = 'block'; // exibe a pergunta

        document.querySelector('.question').innerHTML = q.question; // insere a pergunta
        document.querySelector('.options').innerHTML = ''; // limpar as alternativas

        let optionsHtml = ''; 
        for(let i in q.options) { // para alterar o DOM só uma vez e ter menos processamento e consumo de memória
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`; // string dentro de outra string;
        }
        document.querySelector('.options').innerHTML = optionsHtml; // Processo + rápido pq insiro o conteúdo apenas uma vez; 1 manipulação no DOM

        document.querySelectorAll('.options .option').forEach(item => { // colocar evento de clique em todas as opções
            item.addEventListener('click', optionClickEvent)
        })

    } else {
        finishQuiz(); // chama a função de quiz finalizado
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op')); // armazena qual item a pessoa clicou
    if(questions[currentQuestion].answer === clickedOption) { // se a opção clicada for igual ao answer
        correctAnswers++; // Aumenta a quantidade da variável de respostas corretas
    }

    currentQuestion++; // Aumento o valor da questão atual
    showQuestion(); // Exibo a questão atual
}

function finishQuiz() { // quando o quiz é finalizado
    let points  = Math.floor((correctAnswers / questions.length) * 100); // quantidade de pontos em porcentagem

    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim hein!?';
        document.querySelector('.scorePct').style.color = '#f00';
    } else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bem!';
        document.querySelector('.scorePct').style.color = '#ff0';
    } else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!!!';
        document.querySelector('.scorePct').style.color = '#0d630d';
    }


    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`; // Altera a porcentagem do quadro de resultado
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;


    document.querySelector('.scoreArea').style.display = 'block'; // exibe o scoreArea
    document.querySelector('.questionArea').style.display = 'none'; // esconde a pergunta
    document.querySelector('.progress--bar').style.width = '100%'; // barra de progresso em 100%

}

function resetEvent() { // resetar tudo quando clicar no botão de tentar novamente
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}