(this["webpackJsonpspartans-frontend"]=this["webpackJsonpspartans-frontend"]||[]).push([[0],{54:function(e,t,a){e.exports=a(64)},59:function(e,t,a){},64:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(22),o=a.n(r),s=(a(59),a(10)),c=a(11),i=a(13),m=a(12),d=a(14),h=(a(60),a(35)),u=a(45),p=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement(h.a,{bg:"dark",variant:"dark",expand:"lg"},l.a.createElement(h.a.Brand,{href:"#home"},l.a.createElement("img",{alt:"",src:"/logo.svg",width:"30",height:"30",className:"d-inline-block align-top"})," ","| Spartans"),l.a.createElement(h.a.Toggle,{"aria-controls":"basic-navbar-nav"}),l.a.createElement(h.a.Collapse,{id:"basic-navbar-nav"},l.a.createElement(u.a,{className:"mr-auto"},l.a.createElement(u.a.Link,{href:"#home"},"Home"),l.a.createElement(u.a.Link,{href:"#link"},"Link"))))}}]),t}(n.Component),E=a(19),g=a(34),f=a(29),b=a(27),y=a(53),v=a(52),j=a(48),O=a(6),k=a(20),w=a(7),C="https://theboxathletes.herokuapp.com/athletes/",S=["Edit Records","Update Records"],A=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(l)))).deleteAthlete=function(e){var t=e.target.id;console.log(t),fetch(C+t,{method:"DELETE"}).then((function(e){return e.json()})).then((function(e){console.log("Answer is: "+e),a.props.displayMessage(e),setTimeout(a.props.displayMessage,1500)}),(function(e){return console.log(e)})).then(a.props.getAthletes)},a.updateRecords=function(e){var t=a.props.info._id,n=document.getElementById("scores-"+t).getElementsByClassName("scores-best form-control");if(e.target.innerText===S[0])Object.keys(n).map((function(e){return n[e].disabled=!1})),e.target.innerText=S[1];else{var l={};Object.keys(n).map((function(e){return l[n[e].name]=parseInt(n[e].value)||0}));var r=C+t,o=new Headers;o.append("Content-Type","application/json"),fetch(r,{method:"PUT",headers:o,body:JSON.stringify({personalBest:l})}).then((function(e){console.log(e.json())})).then((function(e){console.log("Answer is: "+e)}),(function(e){return console.log(e)})).then(a.props.getAthletes).then(a.props.displayMessage("Athlete modified")).then(setTimeout(a.props.displayMessage,1e3)),Object.keys(n).map((function(e){return n[e].disabled=!0})),e.target.innerText=S[0]}},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.info,t=e.name,a=e.age,r=e.sex,o=e.email,s=e.photo,c=e._id,i=e.personalBest;return l.a.createElement(n.Fragment,null,l.a.createElement(f.a,{key:c,className:"rounded-0"},l.a.createElement(g.a.Toggle,{as:f.a.Header,variant:"link",eventKey:c},l.a.createElement("span",{style:{fontSize:"1.5rem"}},t)),l.a.createElement(g.a.Collapse,{eventKey:c},l.a.createElement(f.a.Body,null,l.a.createElement(f.a.Img,{as:v.a,src:s,style:{maxHeight:300,objectFit:"contain"}}),l.a.createElement(f.a.Title,{as:"h3"},t),l.a.createElement(f.a.Text,null,l.a.createElement("small",{className:"text-muted"},o),l.a.createElement("span",{style:{display:"block"}}," ","Age: ",a," | Sex: ",r)),l.a.createElement(j.a,{variant:"flush",style:{padding:"1rem 0"},id:"scores-"+c},Object.keys(i).map((function(e,t){return l.a.createElement(j.a.Item,{as:O.a,key:t},l.a.createElement(k.a,null,l.a.createElement(w.a,null,l.a.createElement(O.a.Label,null,l.a.createElement("span",{style:{textTransform:"capitalize"}},e))),l.a.createElement(w.a,null,l.a.createElement(O.a.Control,{disabled:!0,type:"number",className:"scores-best",name:e,defaultValue:i[e]}))))}))),l.a.createElement(y.a,{size:"sm","aria-label":"Action Buttons"},l.a.createElement(b.a,{variant:"success",onClick:this.updateRecords},S[0]),l.a.createElement(b.a,{variant:"warning"},"Edit Athlete"),l.a.createElement(b.a,{variant:"danger",onClick:this.deleteAthlete,id:c},"Detele Athlete"))))))}}]),t}(n.Component),M=a(24),x="https://theboxathletes.herokuapp.com/athletes/",B=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).onChangeFileHandler=function(e){a.setState({selectedFile:e.target.files[0],loaded:0}),console.log(e.target.files[0])},a.handleSubmit=function(e){e.preventDefault();var t=e.currentTarget,n=t.checkValidity();if(console.log(n),a.setState({isValidated:n}),!1===n)e.stopPropagation();else{console.log("Form validated and submitted"),console.log(t.formPersonalBest);for(var l=t.formPersonalBest,r={},o=0;o<l.length;o++)r[l[o].placeholder]=parseInt(l[o].value)||0;var s=new FormData;s.append("name",t.formName.value),s.append("email",t.formEmail.value),s.append("age",t.formAge.value),s.append("sex",t.formGender.value),s.append("personalBest",JSON.stringify(r)),s.append("photo",a.state.selectedFile),fetch(x,{method:"POST",body:s}).then((function(e){console.log(e.json())}),(function(e){console.log(e)})).then(a.props.onHide)}console.log("Submitting attempt: isValidated is "+a.state.isValidated)},a.state={isValidated:!1,selectedFile:null},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement(M.a,Object.assign({},this.props,{size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0}),l.a.createElement(M.a.Header,{closeButton:!0},l.a.createElement(M.a.Title,{id:"contained-modal-title-vcenter"},"Add new Athlete")),l.a.createElement(M.a.Body,null,l.a.createElement(O.a,{noValidate:!0,onSubmit:this.handleSubmit},l.a.createElement(O.a.Group,{as:k.a,controlId:"formName"},l.a.createElement(O.a.Label,{column:!0,sm:2},"Name"),l.a.createElement(w.a,{sm:10},l.a.createElement(O.a.Control,{required:!0,type:"text",placeholder:"Athlete's name"}))),l.a.createElement(O.a.Group,{as:k.a,controlId:"formEmail"},l.a.createElement(O.a.Label,{column:!0,sm:2},"Email"),l.a.createElement(w.a,{sm:10},l.a.createElement(O.a.Control,{required:!0,type:"email",placeholder:"Enter email"}),l.a.createElement(O.a.Text,{className:"text-muted"},"We'll never share your email with anyone else."),l.a.createElement(O.a.Control.Feedback,{type:"invalid"},"Please provide a valid email."))),l.a.createElement(O.a.Group,{as:k.a,controlId:"formAge"},l.a.createElement(O.a.Label,{column:!0,sm:2},"Age"),l.a.createElement(w.a,{sm:10},l.a.createElement(O.a.Control,{required:!0,type:"number",placeholder:"Enter age"}))),l.a.createElement("fieldset",null,l.a.createElement(O.a.Group,{as:k.a,controlId:"formGender"},l.a.createElement(O.a.Label,{as:"legend",column:!0,sm:2},"Sex"),l.a.createElement(w.a,{sm:10},l.a.createElement(O.a.Check,{type:"radio",label:"M",value:"M",name:"gender"}),l.a.createElement(O.a.Check,{type:"radio",label:"F",value:"F",name:"gender"})))),l.a.createElement(O.a.Group,{as:k.a,controlId:"formPersonalBest"},l.a.createElement(O.a.Label,{column:!0,lg:12},"Personal Best"),l.a.createElement(w.a,{sm:3},l.a.createElement(O.a.Control,{size:"sm",type:"number",placeholder:"Benchpress"})),l.a.createElement(w.a,{sm:3},l.a.createElement(O.a.Control,{size:"sm",type:"number",placeholder:"Strictpress"})),l.a.createElement(w.a,{sm:3},l.a.createElement(O.a.Control,{size:"sm",type:"number",placeholder:"Pushpress"})),l.a.createElement(w.a,{sm:3},l.a.createElement(O.a.Control,{size:"sm",type:"number",placeholder:"Row"})),l.a.createElement(w.a,{sm:3},l.a.createElement(O.a.Control,{size:"sm",type:"number",placeholder:"Backsquat"})),l.a.createElement(w.a,{sm:3},l.a.createElement(O.a.Control,{size:"sm",type:"number",placeholder:"Frontsquat"})),l.a.createElement(w.a,{sm:3},l.a.createElement(O.a.Control,{size:"sm",type:"number",placeholder:"Deadlift"})),l.a.createElement(w.a,{sm:3},l.a.createElement(O.a.Control,{size:"sm",type:"number",placeholder:"Trapbardeadlift"}))),l.a.createElement(O.a.Group,{as:k.a,controlId:"formPhoto"},l.a.createElement(O.a.Label,{column:!0,sm:2},"Photo"),l.a.createElement(w.a,{sm:10},l.a.createElement(O.a.Control,{type:"file",onChange:this.onChangeFileHandler}))),l.a.createElement(O.a.Group,{as:k.a},l.a.createElement(w.a,{sm:{span:10,offset:2}},l.a.createElement(b.a,{variant:"success",type:"submit"},"Submit"))))))}}]),t}(n.Component),T=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement(M.a,{show:this.props.show,onHide:this.props.onHide},l.a.createElement(M.a.Header,{closeButton:!0},l.a.createElement(M.a.Title,null,this.props.message)))}}]),t}(n.Component),F=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(i.a)(this,Object(m.a)(t).call(this))).state={modalShow:!1,messageShow:!1,message:""},e.showModal=e.showModal.bind(Object(E.a)(e)),e.hideModal=e.hideModal.bind(Object(E.a)(e)),e.displayMessage=e.displayMessage.bind(Object(E.a)(e)),e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"showModal",value:function(){this.setState({modalShow:!0})}},{key:"hideModal",value:function(){this.setState({modalShow:!1}),this.props.getAthletes(),this.displayMessage("Modal AddAthlete inchis"),setTimeout(this.displayMessage,1500)}},{key:"displayMessage",value:function(e){var t=!this.state.messageShow;this.setState({messageShow:t,message:e})}},{key:"render",value:function(){var e=this;return l.a.createElement(n.Fragment,null,0===this.props.athletes.length&&l.a.createElement("h3",null,"Loading athletes..."),l.a.createElement(g.a,null,this.props.athletes.map((function(t){return l.a.createElement(A,{info:t,key:t._id,getAthletes:e.props.getAthletes,displayMessage:e.displayMessage})}))),l.a.createElement("div",{style:{paddingBottom:"3.5rem"}}),l.a.createElement(b.a,{style:{width:"3rem",height:"3rem",fontSize:"1.25em",borderRadius:"50%",position:"fixed",bottom:100,right:50},onClick:this.showModal},"+"),l.a.createElement(B,{show:this.state.modalShow,onHide:this.hideModal,message:this.state.message}),l.a.createElement(T,{show:this.state.messageShow,onHide:this.displayMessage,message:this.state.message}))}}]),t}(n.Component),z={position:"fixed",left:0,bottom:0,width:"100%",background:"#343a40",color:"#fff",height:"3.5rem",fontSize:"1.25rem",padding:".75rem 3.175rem"},H=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement("footer",{style:z},"| Footer")}}]),t}(n.Component),I="https://theboxathletes.herokuapp.com/athletes/",L=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(i.a)(this,Object(m.a)(t).call(this))).getAthletes=function(){fetch(I).then((function(e){return e.json()})).then((function(t){e.setState({athletes:t}),console.log(e.state.athletes)}),(function(e){console.log(e)}))},e.state={athletes:[]},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.getAthletes()}},{key:"render",value:function(){return l.a.createElement(n.Fragment,null,l.a.createElement(p,null),l.a.createElement(F,{athletes:this.state.athletes,getAthletes:this.getAthletes}),l.a.createElement(H,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[54,1,2]]]);
//# sourceMappingURL=main.9a94266f.chunk.js.map