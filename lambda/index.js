/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const constants = require('./constants');
const persistenceAdapter = require('ask-sdk-s3-persistence-adapter');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = constants.WELCOME_MSG + ` . ` + constants.REPROMPT_MSG;
        
        const attributesManager = handlerInput.attributesManager;
        const persistentAttributes = attributesManager.getPersistentAttributes();
        
        inicializaS3(attributesManager, persistentAttributes)
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

async function inicializaS3(attributesManager, persistentAttributes){
    //console.log(`---- COMECOU O SINCRONISMO S3  `);
        //caso não tenha nenhum medicamento ainda, cria um campo para ele
    if (!persistentAttributes.nomeAttributes) {
        persistentAttributes.nomeAttributes = [];
    }
    attributesManager.setPersistentAttributes(persistentAttributes);
    await attributesManager.savePersistentAttributes();
}

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const SairEscolaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SairEscolaIntent';
    },
    handle(handlerInput) {
        
        const {attributesManager, requestEnvelope} = handlerInput;
        // the attributes manager allows us to access session attributes
        //const sessionAttributes = attributesManager.getSessionAttributes();
        //const {intent} = requestEnvelope.request;
        
        let nome = Alexa.getSlotValue(requestEnvelope, 'nome'); 
        const speakOutput = `O aluno ${nome} foi retirado da escola! Como posso te ajudar?`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Como posso te ajudar?')
            .getResponse();
    }
};



const DeverCasaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DeverCasaIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O dever de casa do aluno, Marina, para o dia de hoje é: Português: Bloco de leitura Página 23. Matemática: Caderno de atividades, página 44' + ` . ` + constants.REPROMPT_MSG;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(constants.REPROMPT_MSG)
            .getResponse();
    }
};

const AulasIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AulasIntent';
    },
    handle(handlerInput) {
        const speakOutput = `Hoje você tem aula de matemática, português e educação física` + ' . ' + constants.REPROMPT_MSG;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(constants.REPROMPT_MSG)
            .getResponse();
    }
};

const AvaliacoesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AvaliacoesIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'As suas notas em, Português, são: primeira avaliação: nove, segunda avaliação: dez, terceira avaliação: dez. Em matemática suas notas são: primeira avaliação: dez, segunda avaliação: dez, e terceira avaliação: dez' + ` . ` + constants.REPROMPT_MSG;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(constants.REPROMPT_MSG)
            .getResponse();
    }
};


const RematriculaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RematriculaIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Certo! Vamos lá! A aluna, Marina, no próximo ano irá para o Ensino fundamental do segundo ano. A anuidade está no valor de quarenta e oito mil, quinhentos e noventa e cinco reais e oitenta e quatro centavos. Você pode escolher pagar em doze parcélas iguais no valor quatro mil, e noventa e quatro reais e sessanta e cinco centavos. ou você pode pagar em treze parcélas iguais, no valor de, três mil setecentos e trinta e oito reais e quatroze centavos. Caso deseje mais informações, entre em contato no telefone, trinta e três, trinta e quatro, sessenta e três, zero zero' + ` . ` + constants.REPROMPT_MSG;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(constants.REPROMPT_MSG)
            .getResponse();
    }
};


const EventoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EventoIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O próximo evento da escola é a Semana da criança, que inicia no dia três de outubro e vai até o dia seis de outubro , ' + constants.REPROMPT_MSG;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(constants.REPROMPT_MSG)
            .getResponse();
    }
};


const CadastrarAlunoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CadastrarAlunoIntent';
    },
    async handle(handlerInput) {

        const {attributesManager, requestEnvelope} = handlerInput;
        // the attributes manager allows us to access session attributes
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = requestEnvelope.request;

        let speakOutput = constants.OPERACAO_CANCELADA + constants.REPROMPT_MSG 
        console.log(`----- CONFIRMACAO = ${intent.confirmationStatus}`);
        if (intent.confirmationStatus === 'CONFIRMED') {
            console.log(`----- ENTROU em confirmado`);
            //Verifica se o usuário confirmou a intenção.
            let nome = Alexa.getSlotValue(requestEnvelope, 'nome');
            let matricula = Alexa.getSlotValue(requestEnvelope, 'matricula');
            
        
            let nomeAttributes = {
                "nome" : nome,
                "matricula" : matricula 
            };
        
            attributesManager.setPersistentAttributes(nomeAttributes);
            await attributesManager.savePersistentAttributes();
            
            
            speakOutput = `<speak>O aluno ${nome}, com a matrícula <say-as interpret-as="digits"> ${matricula}</say-as> foi cadastrado com sucesso !` + constants.REPROMPT_MSG + `</speak>`;
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(constants.REPROMPT_MSG)
            .getResponse();
            
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .withPersistenceAdapter(
            new persistenceAdapter.S3PersistenceAdapter({bucketName:process.env.S3_PERSISTENCE_BUCKET})
    )
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        CadastrarAlunoIntentHandler,
        DeverCasaIntentHandler,
        EventoIntentHandler,
        AulasIntentHandler,
        SairEscolaIntentHandler,
        RematriculaIntentHandler,
        AvaliacoesIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();