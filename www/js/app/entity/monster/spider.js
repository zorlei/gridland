define(['app/entity/monster/monster', 'app/action/actionfactory'], 
		function(Monster, ActionFactory) {
	
	var Spider = function(options) {
		this.options = $.extend({}, this.options, {}, options);
		this.hostile = true;
		this.action = null;
		this.hp(this.maxHealth());
		this.xp = 3;
	};
	Spider.prototype = new Monster({
		monsterClass: 'spider',
		speed: 20
	});
	Spider.constructor = Spider;
	
	Spider.prototype.think = function() {
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
	
	Spider.prototype.maxHealth = function() {
		return 3;
	};
	
	Spider.prototype.getDamage = function() {
		return 2;
	};
	
	return Spider;
});