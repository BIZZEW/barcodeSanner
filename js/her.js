/*by zhuhy*/
window.her = (function(win, h) {
		h.loading = function(hintText) {
				var $body = document.body,
				    $loadingLayer = document.getElementsByClassName('loadingLayer')[0],

				    areawidth = window.innerWidth,
				    areaheight = window.innerHeight,

				    canvassize = 500,

				    length = 30,
				    radius = 5.6,

				    rotatevalue = 0.035,
				    acceleration = 0,
				    animatestep = 0,
				    toend = false,

				    pi2 = Math.PI * 2,

				    group = new THREE.Group(),
				    mesh,
				    ringcover,
				    ring,
				    camera,
				    scene,
				    renderer;

				camera = new THREE.PerspectiveCamera(65, 1, 1, 10000);
				camera.position.z = 140;

				scene = new THREE.Scene();
				scene.add(group);

				mesh = new THREE.Mesh(new THREE.TubeGeometry(new (THREE.Curve.create(function() {},
				function(percent) {

				var x = length*Math.sin(pi2*percent)/2,
				y = radius*Math.cos(pi2*3*percent)/2,
				z, t;

				t = percent%0.25/0.25;
				t = percent%0.25-(2*(1-t)*t* -0.0185 +t*t*0.25);
				if (Math.floor(percent/0.25) == 0 || Math.floor(percent/0.25) == 2) {
				t *= -1;
				}
				z = radius*Math.sin(pi2*2* (percent-t));

				return new THREE.Vector3(x, y, z);

				}
				))(), 200, 0.9, 2, true), new THREE.MeshBasicMaterial({
						color : 0xffffff
				}));
				group.add(mesh);

				(function() {
						var plain,
						    i;
						for ( i = 0; i < 10; i++) {
								plain = new THREE.Mesh(new THREE.PlaneGeometry(100, 50, 1, 1), new THREE.MeshBasicMaterial({
										color : 0x666666,
										transparent : true,
										opacity : 0.13
								}));
								plain.position.z = -2.5 + i * 0.5;
								group.add(plain);
						}
				})();

				renderer = new THREE.WebGLRenderer({
						antialias : true,
						alpha : true
				});
				renderer.setPixelRatio(window.devicePixelRatio);
				renderer.setSize(canvassize, canvassize);
				renderer.setClearColor(0x000000, 0);

				var inner = document.createElement("div");
				var hint = document.createElement("div");
				var container = document.createElement("div");
				var text = document.createTextNode(hintText);
				inner.className = "loadingInner";
				hint.className = "loadingHint";
				container.className = "canvasContainer";
				hint.appendChild(text);
				container.appendChild(renderer.domElement);
				inner.appendChild(hint);
				inner.appendChild(container);
				$loadingLayer.appendChild(inner);

				jQuery(".loadingLayer").fadeIn(100);
				jQuery(".loadingInner").fadeIn(500);
				jQuery(".canvasContainer").fadeIn(500);
				jQuery(".loadingHint").fadeIn(500);

				animate();

				function render() {

						var progress;

						animatestep = Math.max(0, Math.min(240, toend ? animatestep + 1 : animatestep - 4));
						acceleration = easing(animatestep, 0, 1, 240);

						if (acceleration > 0.35) {
								progress = (acceleration - 0.35) / 0.65;
								group.rotation.y = -Math.PI / 2 * progress;
								group.position.z = 50 * progress;
								progress = Math.max(0, (acceleration - 0.97) / 0.03);
								mesh.material.opacity = 1 - progress;
								ringcover.material.opacity = ring.material.opacity = progress;
								ring.scale.x = ring.scale.y = 0.9 + 0.1 * progress;
						}

						renderer.render(scene, camera);

				}

				function animate() {
						mesh.rotation.x += rotatevalue + acceleration;
						render();
						requestAnimationFrame(animate);
				}

				function easing(t, b, c, d) {
						if ((t /= d / 2) < 1)
								return c / 2 * t * t + b;
						return c / 2 * ((t -= 2) * t * t + 2) + b;
				}

		};

		h.loaded = function() {
				var inner = document.getElementsByClassName("loadingInner")[0];
				var layer = document.getElementsByClassName("loadingLayer")[0];
				jQuery(".loadingHint").fadeOut(50);
				jQuery(".canvasContainer").fadeOut(50);
				jQuery(".loadingInner").fadeOut(50);
				layer.removeChild(inner);
				jQuery(".loadingLayer").fadeOut(100);
		};
		return h;
})(window, window.her || {})