# predicate.js
Predicate utility 

<pre>
Predicate.or=function(a,b) boolean or for predicates passed 
Predicate.and=function(a,b) boolean and for predicates passed 
Predicate.not=function(a) negate predicate passed 
Predicate.condition=function(a,op,b) define a condition
Predicate.registerOperator=function(n,f) register a new operator
</pre>
<b>Operators</b>
<pre>

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
</pre>

