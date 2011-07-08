;(function(){
			var tool = {
				$ : function(id){
					return typeof id === "string" ? document.getElementById(id) : id;
				},
				isInt:function(str){
					return ! isNaN( parseFloat(str) );
				},
				isString:function(str){
					return /^\w+$/.test(str);
				},
				isFloat:function(str){
					return str ? String(parseFloat(str)) === str : false;//此方法需要重构
				},
				isEmail:function(str){
					return false;
				},
				minValue:function(str, min){
					return tool.isFloat(str) ? parseFloat(str) >= min : false;
				},
				maxValue:function(str, max){
					return tool.isFloat(str) ? parseFloat(str) <= max : false;
				},
				minLength:function(str, min){
					return str && String(str).length >= min;
				},
				maxLength:function(str, max){
					return str && String(str).length <= max;
				}
			};
			
			var Map = {
				"int":{fn:"isInt", msg:function(){return "必须为整数";}},
				"string":{fn:"isString", msg:function(){return "只能包含英文字母";}},
				"float":{fn:"isFloat", msg:function(){return "只能是小数";}},
				"minValue":{fn:"minValue", msg:function(n){return "最小值必须大于" + n;}},
				"maxValue":{fn:"maxValue", msg:function(n){return "最大值必须小于" + n;}},
				"minLength":{fn:"minLength", msg:function(n){return "最小长度为" + n;}},
				"maxLength":{fn:"maxLength", msg:function(n){return "最大长度为" + n;}}
			};
			
			var check = function(rule){
				this.init(rule);
			};
			
			check.prototype = {
				init:function(rule){
					this.input = tool.$(rule.id);
					
					if(rule.type){
						rule[rule.type.rule] = {rule:rule.type.rule, msg:rule.type.msg || ""};
					}
					
					delete rule.id;
					delete rule.type;
					
					this.rule = rule;
					this.Stip = null;
				},
				constructor:check,
				okay:function(){
					var str = this.input.value;
					var key, mapKey, ruleKey, msg, i = 0;
					var ok = true;
					var keys = ["int","string","float","minValue","maxValue","minLength","maxLength"];
					
					for(i; i<keys.length; i++){	
						
						key = keys[i];
						
						if(this.rule[key] !== undefined){
						
							mapKey = Map[key];
							ruleKey = this.rule[key];

							if( !tool[ mapKey["fn"] ](str, ruleKey["rule"]) ){
								this.Stip && this.Stip.hide()
								this.Stip = new Stip(this.input);
								this.Stip.show(( ruleKey["msg"] || mapKey["msg"](ruleKey["rule"]) ));
								
								ok = false;
								break;
							}
							
							this.Stip && this.Stip.hide();
						
						}
					}
					return ok;
				},
				
				getValue:function(){
					return this.input.value;
				},
				setValue:function(value){
					return this.input.value = value;
				}
			}

			
			var checkForm = function(rules){	
				this.checkList = [];
				this.init(rules);
			}
			checkForm.prototype = {
				init:function(rules){
					var i;
					for(i=0; i<rules.length; i++){
						this.checkList.push(new check(rules[i]));
					}
				},
				okay:function(){
					var i, ok=true;
					for(i=0;i<this.checkList.length;i++){
						if( !this.checkList[i].okay() ){
							ok = false;
						}
					}
					return ok;
				},
				getValues:function(){
					var valueMap = {};
					var i = 0;
					for(i; i< this.checkList.length; i++){
						valueMap[ this.checkList[i].input.getAttribute("name") ] = this.checkList[i].getValue();
					}
					return valueMap;
				}
			};
			window.checkForm = checkForm;
		})();