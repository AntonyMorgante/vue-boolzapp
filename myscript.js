let miapp = new Vue({
    el:`#container`,
    data: {
        current:null,
        message:"",
        search: "",
        searchemoji: "",
        selectedmessage: null,
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: 
                [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],
        possibleanswers:[
            "non lo so",
            "ma che dici?",
            "va bene",
            "ok",
            "interessante...",
            "non penso di aver capito!",
            "Partita dopo?"
        ]
    },
    updated: function(){
        let box = document.querySelector(".scroll");
        box.scrollTop = box.scrollHeight;
      },
    methods:{
        getimagelocation:function(index){
            return "img/img"+this.contacts[index].avatar+".png"
        },
        getlastmessage:function(index){
            let lastmessage= this.contacts[index].messages.slice(-1);
            return lastmessage[0].text;
        },
        getlastdate:function(index){
            let lastmessage= this.contacts[index].messages.slice(-1);
            return lastmessage[0].date;
        },
        setcurrent:function(index){
            this.current=index;
        },
        checksend: function(index){
            return this.contacts[this.current].messages[index].status;
        },
        getdate: function(){
            let date = new Date();
            let day = date.toLocaleDateString(`en-GB`);
            let hour = String(date.getHours());
            let minutes = String(date.getMinutes());
            let seconds = String(date.getSeconds());
            hour=hour.padStart(2,"0");
            minutes=minutes.padStart(2,"0");
            seconds = seconds.padStart(2,"0");
            let completedate = day + " " + hour + ":" + minutes + ":" + seconds
            return completedate;
        },
        getreplytext: function(){
            let sup = this.possibleanswers.length;
            let n = Math.floor(Math.random()*sup)
            return this.possibleanswers[n];
        },
        newreply: function(index){
            let day = this.getdate();
            let answer = this.getreplytext();
            let reply={
                date:day,
                text:answer,
                status: "received"
            };
            this.contacts[index].messages.push(reply);
        },
        sendmessage: function(){
            let target = this.current;
            let trimmedmessage = this.message.trim();
            if (trimmedmessage!=""){
                let day=this.getdate();
                let newmessage={
                    date: day,
                    text: this.message,
                    status: "sent"
                };
                this.contacts[target].messages.push(newmessage);
                setTimeout(this.newreply,1000,target);
                this.message="";
            }
        },
        searched: function(index){
            let namesearched = this.contacts[index].name.toLowerCase();
            if (namesearched.includes(this.search)){
                return true;
            }
            else if (this.contacts[index].name.includes(this.search)){
                return true;
            }
            return false;
        },
        noselectmessage: function(){
            this.selectedmessage = null;
        },
        selectmessage: function(index){
            this.selectedmessage = index;
        },
        deletemessage: function(index){
            this.contacts[this.current].messages.splice(index,1);
            this.noselectmessage();
        },
        messagecount: function(index){
            return this.contacts[this.current].messages.length;
        },
        insert: function(emoji) {
            this.message += emoji;
        },
        messagenumber: function(index){
            return this.contacts[index].messages.length;
        }
    }
})

Vue.use(EmojiPicker);

//rivedere le date
//controllo per nessun messaggio

/*

- sotto al nome del contatto nella parte in alto a destra,
cambiare l’indicazione dello stato: visualizzare il testo “sta scrivendo...” 
nel timeout in cui il pc risponde, poi mantenere la scritta 
“online” per un paio di secondi e infine visualizzare “ultimo accesso alle xx:yy” 
con l’orario corretto

- dare la possibilità all’utente di cancellare tutti i messaggi di un contatto 
o di cancellare l’intera chat con tutti i suoi dati: cliccando sull’icona 
con i tre pallini in alto a destra, si apre un dropdown menu in cui sono 
presenti le voci “Elimina messaggi” ed “Elimina chat”; cliccando su di essi 
si cancellano rispettivamente tutti i messaggi di quel contatto 
(quindi rimane la conversazione vuota) oppure l’intera chat comprensiva 
di tutti i dati del contatto oltre che tutti i suoi messaggi 
(quindi sparisce il contatto anche dalla lista di sinistra)

- aggiungere una splash page visibile per 1s all’apertura dell’app

- A) rendere l’app responsive e fruibile anche su mobile: di default si 
visualizza solo la lista dei contatti e cliccando su un contatto si vedono i 
messaggi di quel contatto.

B) aggiungere quindi un’icona con una freccia verso sinistra per tornare 
indietro, dalla visualizzazione della chat alla visualizzazione di tutti i 
contatti

- aggiungere un’icona per ingrandire o rimpicciolire il font: 
dovrebbe essere sufficiente aggiungere una classe al wrapper principale

- aggiungere un’icona per cambiare la modalità light/dark: 
dovrebbe essere sufficiente aggiungere una classe al wrapper principale (modificat
*/