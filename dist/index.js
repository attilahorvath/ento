!function(){"use strict";class t{constructor(t,e){this.index=t,this.generation=e}}class e{constructor(t,e){this.entries=new Array(t).fill(),this.entries.forEach((t,s)=>{this.entries[s]={active:!1,generation:0,component:new e}})}allocate(t){const e=this.entries[t.index];return e.generation<=t.generation?(e.active=!0,e.generation=t.generation,e.component):null}fetch(t){const e=this.entries[t.index];return e.generation===t.generation&&e.active?e.component:null}deallocate(t){this.entries[t.index].active=!1}*activeEntries(){for(let e=0;e<this.entries.length;e++){const s=this.entries[e];s.active&&(yield{entityIndex:new t(e,s.generation),component:s.component})}}}class s{constructor(t){this.capacity=t,this.componentArrays=new Map}register(t){this.componentArrays.set(t,new e(this.capacity,t))}components(t){return this.componentArrays.get(t)}deallocateAll(t){this.componentArrays.values().forEach(e=>e.deallocate(t))}}var i={Position:function(){this.x=0,this.y=0},Sprite:function(){this.width=50,this.height=25},Input:function(){},Tilemap:function(){}};class n{constructor(t){this.entities=new Array(t).fill(),this.entities.forEach((t,e)=>{this.entities[e]={active:!1,generation:0}})}allocate(){const e=this.entities.findIndex(t=>!t.active),s=this.entities[e];return s&&!s.active?(s.active=!0,s.generation+=1,new t(e,s.generation)):null}deallocate(t){const e=this.entities[t.index];e.generation===t.generation&&(e.active=!1)}}class a{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=100,this.canvas.height=50,document.body.appendChild(this.canvas),this.gl=this.canvas.getContext("webgl"),this.gl.clearColor(0,0,0,1)}clear(){this.gl.disable(this.gl.SCISSOR_TEST),this.gl.clearColor(0,0,0,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.enable(this.gl.SCISSOR_TEST)}}const r=new class{constructor(){this.allocator=new n(10),this.state=new s(10),Object.keys(i).forEach(t=>{this.state.register(i[t])}),this.renderer=new a,this.systems=[],this.lastTime=0}allocateEntity(){return this.allocator.allocate()}deallocateEntity(t){this.allocator.deallocate(t),this.state.deallocateAll(t)}allocateComponent(t,e){return this.state.components(e).allocate(t)}fetchComponent(t,e){return this.state.components(e).fetch(t)}*entitiesWith(t){yield*this.state.components(t).activeEntries()}createEntity(t){const e=this.allocateEntity();return Object.keys(t).forEach(s=>{const n=this.allocateComponent(e,i[s]);Object.keys(t[s]).forEach(e=>{n[e]=t[s][e]})}),e}addSystem(t){this.systems.push(new t(this))}run(){requestAnimationFrame(t=>this.update(t))}update(t){requestAnimationFrame(t=>this.update(t));const e=t-this.lastTime;this.lastTime=t,this.renderer.clear(),this.systems.forEach(t=>t.run(e))}};r.addSystem(class{constructor(t){this.game=t,this.renderer=this.game.renderer,this.up=!1,this.down=!1,this.left=!1,this.right=!1,addEventListener("keydown",t=>this.keyDown(t)),addEventListener("keyup",t=>this.keyUp(t))}keyDown(t){switch(t.keyCode){case 38:case 87:case 75:this.up=!0,t.preventDefault();break;case 40:case 83:case 74:this.down=!0,t.preventDefault();break;case 37:case 65:case 72:this.left=!0,t.preventDefault();break;case 39:case 68:case 76:this.right=!0,t.preventDefault()}}keyUp(t){switch(t.keyCode){case 38:case 87:case 75:this.up=!1,t.preventDefault();break;case 40:case 83:case 74:this.down=!1,t.preventDefault();break;case 37:case 65:case 72:this.left=!1,t.preventDefault();break;case 39:case 68:case 76:this.right=!1,t.preventDefault()}}run(t){for(const{entityIndex:e}of this.game.entitiesWith(i.Input)){const s=this.game.fetchComponent(e,i.Position);this.up&&(s.y+=.1*t),this.down&&(s.y-=.1*t),this.left&&(s.x-=.1*t),this.right&&(s.x+=.1*t)}}}),r.addSystem(class{constructor(t){this.game=t,this.renderer=this.game.renderer}run(){for(const{entityIndex:t,component:e}of this.game.entitiesWith(i.Sprite)){const s=this.game.fetchComponent(t,i.Position);this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST),this.renderer.gl.scissor(s.x,s.y,e.width,e.height),this.renderer.gl.clearColor(1,1,1,1),this.renderer.gl.clear(this.renderer.gl.COLOR_BUFFER_BIT),this.renderer.gl.disable(this.renderer.gl.SCISSOR_TEST)}}}),r.createEntity({Tilemap:{}}),r.createEntity({Position:{x:20,y:10},Sprite:{width:10,height:10},Input:{}}),r.createEntity({Position:{x:50,y:30},Sprite:{width:10,height:20},Input:{}}),r.run()}();