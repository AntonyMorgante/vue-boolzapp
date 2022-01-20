let miapp = new Vue({
    el:`#container`,
    data: {
        current:null,
        message:"",
        search: "",
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
        ]
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
        newreply: function(){
            let day = this.getdate();
            let reply={
                date:day,
                text:"Ok",
                status: "received"
            };
            this.contacts[this.current].messages.push(reply);
        },
        sendreply:function(){
            let timeout = setTimeout(this.newreply,1000);
        },
        sendmessage: function(){
            if (this.message!=""){
                let day=this.getdate();
                let newmessage={
                    date: day,
                    text: this.message,
                    status: "sent"
                };
                this.contacts[this.current].messages.push(newmessage);
                this.message="";
                this.sendreply();
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
        }
    }
})