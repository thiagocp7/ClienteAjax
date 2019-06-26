
var AjaxClient = null;
var CallBackMethod = null;

function criarAjax() 
{

    var request = null;

    try {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        request = new XMLHttpRequest();
    } catch (trymicrosoft) {
        // code for IE6, IE5
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (othermicrosoft) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) {
                request = null;
            }
        }
    }

    return request;

}

function RequestPostAjax(url, data, tipoComunicacao = false) 
{
    
    /* Observação o Tipo de Comunicação Sincrona 
    [O XMLHttpRequest síncrono no segmento principal é obsoleto devido a seus efeitos 
    prejudiciais à experiência do usuário final. Para mais ajuda, verifique https://xhr.spec.whatwg.org/.] 
    */

    var urlServico = url;
    var method = "POST";
    var ContentType = "application/x-www-form-urlencoded";
    /* Cria o objeto [XMLHttpRequest]*/
    AjaxClient = criarAjax();

    //Specifies the request
    //open(method, url, async, user, psw)
    //method: the request type GET or POST
    //url: the file location
    //async: true (asynchronous) or false (synchronous)
    //user: optional user name
    //psw: optional password
    AjaxClient.open(method, urlServico, tipoComunicacao);
    
    // Só pode ser configurada após a abertura da conexão
    AjaxClient.setRequestHeader("Content-type", ContentType);

    //Defines a function to be called when the readyState property changes 
    AjaxClient.onreadystatechange = responseAjax;

    //Sends the request to the server. Used for POST requests [send(string)]
    //Sends the request to the server. Used for GET requests [send()]
    AjaxClient.send(data);

    return false;

}

function RequestGetAjax(url, MethodCallBack, tipoComunicacao = true) 
{
    
    /* Observação o Tipo de Comunicação Sincrona 
    [O XMLHttpRequest síncrono no segmento principal é obsoleto devido a seus efeitos 
    prejudiciais à experiência do usuário final. Para mais ajuda, verifique https://xhr.spec.whatwg.org/.] 
    */

    var urlServico = url;
    var method = "GET";

    if(typeof(MethodCallBack)=="function")
    {
        CallBackMethod = MethodCallBack;
    }
   
    
    /* Cria o objeto [XMLHttpRequest]*/
    AjaxClient = criarAjax();

    //Specifies the request
    //open(method, url, async, user, psw)
    //method: the request type GET or POST
    //url: the file location
    //async: true (asynchronous) or false (synchronous)
    //user: optional user name
    //psw: optional password
    AjaxClient.open(method, urlServico, true);
    
    //Defines a function to be called when the readyState property changes 
    AjaxClient.onreadystatechange = responseAjax;

    //Sends the request to the server. Used for POST requests [send(string)]
    //Sends the request to the server. Used for GET requests [send()]
    AjaxClient.send(null);

    return false;

}

function responseAjax() 
{

    //O estado do pedido:
    //0: request not initialized                    Descrição: open() não foi chamado ainda.
    //1: server connection established              Descrição: send() não foi chamado ainda.
    //2: request received                           Descrição: send() foi chamado, e cabeçalhos e status estão disponíveis.
    //3: processing request                         Descrição: Download; responseText contém dados parciais.
    //4: request finished and response is ready     Descrição: A operação está concluída. 
    if (AjaxClient.readyState == 4) {

        /* 200 OK: Padrão de resposta para solicitações HTTP sucesso. A resposta real dependerá do método de solicitação usado. 
        Em uma solicitação GET, a resposta conterá uma entidade que corresponde ao recurso solicitado. Em uma solicitação POST a 
        resposta conterá a descrição de uma entidade, ou contendo o resultado da ação. */
        if (AjaxClient.status == 200) 
        {
            //Passa os dados retornados
            if(AjaxClient.responseXML != null)
            {
                sucessoRequest(AjaxClient.responseXML, "XML");
            } 
            else
            {
                sucessoRequest(AjaxClient.responseText, "JSON");
            }

            AjaxClient = null;
        } else if (AjaxClient.status == 500) {
            //Passa os dados retornados
            erroRequest(AjaxClient.responseText);
            AjaxClient = null;
        } else if (AjaxClient.status == 0) {
            erroRequest("Servidor indisponivel no momento!");
            AjaxClient = null;
        }

    }

    return false;

}

function sucessoRequest(Data, TypeData) 
{    
    CallBackMethod(Data,TypeData)
    //return Data;
}

function erroRequest(textoErro) 
{

    alert("Status Upload: " + textoErro);
   
    return false;

}




