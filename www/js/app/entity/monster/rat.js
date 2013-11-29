define(['app/entity/monster/monster', 'app/action/actionfactory'], 
		function(Monster, ActionFactory) {
	
	var Rat = function(options) {
		this.options = $.extend({}, this.options, {}, options);
		this.hp(this.maxHealth());
		this.xp = 2;
	};
	Rat.prototype = new Monster({
		monsterClass: 'rat',
		speed: 20
	});
	Rat.constructor = Rat;
	
	Rat.prototype.think = function() {
		var _this = this;
		var World = require('app/world');
		if(_this.isIdle() && _this.isAlive() && _this.action == null) {
			if(!_this.attackRange(World.dude)) {
				_this.action = ActionFactory.getAction("MoveTo", {
					target: World.dude
				});
			} else {
				_this.action = ActionFactory.getAction("FastAttack", {
					target: World.dude
				});
			}
			if(_this.action != null) {
				_this.action.doAction(_this);
				return true;
			}
		}
		return false;
	};
	
	Rat.prototype.maxHealth = function() {
		return 2;
	};
	
	Rat.prototype.getDamage = function() {
		return 1;
	};
	
	return Rat;
});