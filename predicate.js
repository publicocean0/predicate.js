(function(context){
var countNodes=function(v){
if (v instanceof Condition) return 1;	
else if (v instanceof And) return  countNodes(v.value1) + countNodes(v.value2)+1;	
else if (v instanceof Or) return   countNodes(v.value1) + countNodes(v.value2)+1;
else if (v instanceof Not) return countNodes(v.value)+1;
else if (v instanceof Predicate) return countNodes(v.value);
else return 0;				
}
var match =function(v,e){
if (v instanceof Condition) {
	var p=e;
	var a=v.lOperand.split('.').filter(function(e){return e!='';});	
	for(var i=0;i<a.length;i++){
		if (typeof(p)!='object') return false;
		p=p[a[i]];
	}
     
	var comp=OPERATORS[v.operator];
	if (!comp) throw "invalid operator "+v.operator;
	return comp(p,v.rOperand);
	
} 
else if (v instanceof And) return  match(v.value1,e) && match(v.value2,e);	
else if (v instanceof Or) return  match(v.value1,e) || match(v.value2,e);	
else if (v instanceof Not) return  ! match(v.value,e);
else if (v instanceof Predicate) return match(v.value,e);
else return false;		
}
var compareNode =function(v,e){
if (v instanceof Condition) {
	if (e instanceof Predicate) e=e.value;
	if (e instanceof Condition){
	 if (e.lOperand &&e.lOperand!==v.lOperand) return false;	
	  if (e.rOperand &&e.rOperand!==v.rOperand) return false;
	   if (e.operator &&e.operator!==v.operator) return false;
		return true;
		
	} else return false;
} 
else if (v instanceof And) return  e instanceof And && ((compareNode(v.value1,e.value1) && compareNode(v.value2,e.value2))||(compareNode(v.value2,e.value1) && compareNode(v.value1,e.value2)));	
else if (v instanceof Or) return  e instanceof Or && ((compareNode(v.value1,e.value1) && compareNode(v.value2,e.value2))||(compareNode(v.value2,e.value1) && compareNode(v.value1,e.value2)));	
else if (v instanceof Not) return e instanceof Not && compareNode(v.value,e.value);
else if (v instanceof Predicate) return (e instanceof Predicate && compareNode(v.value,e.value)) || compareNode(v.value,e);
else return false;		
}
var And=function(v1,v2){
this.value1=v1;
this.value2=v2;
this.toString=function(as){
return '('+v1.toString(as)+' AND '+v2+')';	
}
}
var Or=function(v1,v2){
this.value1=v1;
this.value2=v2;
this.toString=function(as){
return '('+v1.toString(as)+' OR '+v2+')';	
}	
}
var Not=function(v){
this.value=v;
this.toString=function(as){
return ' NOT ('+v.toString(as)+')';	
}
}
var Condition=function(a,op,b){
this.lOperand=a;
this.rOperand=b;
this.operator=op;	
this.toString=function(as){
var o1=(as && as[a])||a;
var o2;

	if (typeof(b)=='string') o2='"'+b+'"';
	else o2=b;
	return o1+' '+op+' '+o2;

}
}
var OPERATORS={
"typeof":function(a,b){ return b==((a instanceof Object)?a.constructor.toString():typeof(a)); },
"=":function(a,b){  return a  ==b},	
	 "!=":function(a,b){  return a !=b},
	 "<":function(a,b){  return a < b},
	 ">":function(a,b){  return a >b},
	 ">=":function(a,b){  return a >=b},	
	 "<=":function(a,b){  return a  <=b},
	 "⊂"  :function(a,b){  return  b instanceof Array && a instanceof Array && a.filter(function (elem) {    return b.indexOf(elem) > -1;}).length < b.length;},
	 "⊃"  :function(a,b){  return  b instanceof Array && a instanceof Array && b.filter(function (elem) {    return a.indexOf(elem) > -1;}).length == a.length;},
	 "⊆"  :function(a,b){  return  b instanceof Array && a instanceof Array && a.filter(function (elem) {    return b.indexOf(elem) > -1;}).length <= b.length;},
	 "⊇"  :function(a,b){  return  b instanceof Array && a instanceof Array && b.filter(function (elem) {    return a.indexOf(elem) > -1;}).length <= a.length;},
     "≡"  :function(a,b){  return  a  ==b || ( b instanceof Array && p instanceof Array && b.filter(function (elem) {    return p.indexOf(elem) > -1;}).length == a.length);},
	 "∈":function(a,b){  return  b instanceof Array &&  b.indexOf(a)>=0},  
	 "∋":function(a,b){  return  a instanceof Array && a.indexOf(b)>=0},  
	 "~":function(a,b){  return  a && new RegExp("^.*"+b+".*$",'i').test(a)},
	 "!~":function(a,b){  return  a && !new RegExp("^.*"+b+".*$",'i').test(a)},
	 "≃":function(a,b){  return  a && new RegExp("^.*"+b+".*$").test(a)},
	 "!≃":function(a,b){  return  a && !new RegExp("^.*"+b+".*$").test(a)},
	 "^~":function(a,b){  return  a && new RegExp("^"+b+".*$",'i').test(a)},
	 "$~":function(a,b){  return  a && new RegExp("^.*"+b+"$",'i').test(a)},
	 "^≃":function(a,b){  return  a && new RegExp("^"+b+".*$").test(a)},
	 "$≃":function(a,b){  return  a && new RegExp("^.*"+b+"$").test(a)},
	 "∽":function(a,b){  return  b && new RegExp("^.*"+a+".*$",'i').test(b)},
	 "!∽":function(a,b){  return  b && !new RegExp("^.*"+a+".*$",'i').test(b)},
	 "⋍":function(a,b){  return  a && new RegExp("^.*"+b+".*$").test(a)},
	 "!⋍":function(a,b){  return  a && !new RegExp("^.*"+b+".*$").test(a)},
	 "^∽":function(a,b){  return  b && new RegExp("^"+a+".*$",'i').test(b)},
	 "$∽":function(a,b){  return  b && new RegExp("^.*"+a+"$",'i').test(b)},
	  "^⋍":function(a,b){  return  b && new RegExp("^"+a+".*$").test(b)},
	 "$⋍":function(a,b){  return  b && new RegExp("^.*"+a+"$").test(b)}
}

var Selector =function(value){


this.get=function(){
return value;	
}


this.filter=function(p){

if (value instanceof Array) value= value.filter(function(e){
return match(p.value,e);
});
else value= match(p.value,value)?value:null;

return this;	
}
var reduce=function(p,v){
if (v instanceof Array){
var o=[];
for(var k=0;k<v.length;k++){
if (match(p,{key:k,value:v[k]})) o.push(v[k]);
}
return o;
}
else if(v instanceof Object){
var o={};
for(var k in v){
if (match(p,{key:k,value:v[k]})) o[k]=v[k];
}
return o;
}
else return match(p,v)?v:undefined	
}

this.project=function(p){
if (value instanceof Array) value= value.map(function(e){
return reduce(p.value,e);
});
else if (value) value= reduce(p.value,value);

return this;
}

this.limit=function(l){
if (value instanceof Array){
value=value.length>0?value.slice(0,l):[];	
} else if (value instanceof Object) {
var v={},keys=Object.keys(value),k=keys.length>0?keys.slice(0,l):[];
keys.forEach(function(e){
v[e]=value[e];
});
value=v;	
} else if (l==0) value=null;	

return this;
}	
	
}


var Predicate=function(){
var value=null;
this.equals=function(p){
	return compareNode(value,p.value);
}
this.length=function(){
return value?countNodes(value):0;	
}
this.condition=function(a,op,b){
value=new Condition(a,op,b);
return this;
}
this.not=function(v){
value=new Not(v?v:this.value);
return this;
}
this.and=function(v){
value=new And(this.value,v);
return this;	
}
this.or=function(v){
value=new Or(this.value,v);
return this;	
}

Object.defineProperty(this, "value", {
  get: function()  {
return value;
}
});
this.toString=function(as){
return value.toString(as);	
}




}

Predicate.not=function(a){return new Predicate().not(a);}
Predicate.condition=function(a,op,b){return new Predicate().condition(a,op,b);}
Predicate.registerOperator=function(n,f){
if (typeof(f)=='function') OPERATORS[n]=f;	
}
context.Predicate=Predicate;
context.Selector=Selector;
})(window);
