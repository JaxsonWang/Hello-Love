/**
 * 手绘图背景图绘制
 * @param self
 * @param canvasWidth
 * @param canvasHeight
 */
export const initCanvas = (self, canvasWidth, canvasHeight) => {
  const rough = window.rough;
  const extend = (base, ...extensions) => Object.assign({}, base, ...extensions);
  const parseColor = ({h, s, l, a}) => `hsla(${h},${s}%,${l}%,${a})`;
  const Color = extend.bind(null, {h: 0, s: 100, l: 100, a: 1});
  const Vector = extend.bind(null, {x: 0, y: 0});
  const Particle = extend.bind(null, {
    pos: Vector(),
    vel: Vector(),
    angle: 0,
    speed: 0,
    radius: 0,
    rotation: 0,
    color: Color()
  });
  const colors = [
    Color({h: 20, s: 100, l: 50}),
    Color({h: 200, l: 50}),
    Color({h: 300, l: 50}),
    Color({h: 100, l: 40}),
  ];
  const animationLoop = scope => {
    if (scope.animation) {
      scope.animation(animationLoop.bind(null, scope))
    }
    const {ctx} = scope;
    const {canvas} = ctx;
    const rc = rough.canvas(canvas);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scope.particles.map((p, i) => {
      p.pos.y -= p.speed;
      if (i % 2) {
        p.pos.x = p.pos.x + Math.sin(p.angle) * .2
      } else {
        p.pos.x = p.pos.x - Math.cos(p.angle) * .2
      }
      p.angle += .01;
      rc.circle(p.pos.x, p.pos.y, p.radius, {
        fill: parseColor(p.color),
        roughness: Math.random() * 1.5,
        hachureGap: p.hachureGap,
        hachureAngle: p.hachureAngle
      });
      rc.line(p.pos.x, p.pos.y + p.radius * 1.2, p.pos.x, p.pos.y + p.radius / 2, {
        bowing: Math.random() * 3
      });
      if (p.pos.y + p.radius * 3 < 0) {
        p.pos.y = canvas.height + p.radius * 3;
        p.pos.x = Math.random() * (canvas.width - p.radius)
      }
    })
  };
  const scope = {
    animation: requestAnimationFrame.bind(null),
    ctx: document.createElement('canvas').getContext('2d'),
    rotation: 0,
    particles: []
  };
  ~(scope => {
    const {ctx: {canvas}} = scope;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    self.$refs.canvas.appendChild(canvas);
    let particleCount = 30; // 数量
    while (particleCount--) {
      scope.particles.push(Particle({
        pos: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height
        },
        speed: Math.random() + .2,
        radius: Math.random() * 60 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        hachureAngle: Math.random() * 90,
        hachureGap: Math.random() * 8
      }))
    }
    animationLoop(scope)
  })(scope)
};

/**
 * 爱心手绘图绘制
 * @param self
 */
export const loveCanvas = (self) => {
  const rough = window.rough;
  const rc = rough.canvas(self.$refs.love);
  rc.path('M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543  c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503  c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z',
    {
      fill: 'red',
      fillStyle: 'solid', // solid fill
      roughness: 0,
      hachureAngle: 60, // angle of hachure,
      hachureGap: 8,
      fillWeight: 3,
    }
  );
};

/**
 * 邮箱手绘图绘制
 * @param self
 */
export const mailCanvas = (self) => {
  const rough = window.rough;
  const rc = rough.canvas(self.$refs.mail);
  rc.rectangle(0, 30, self.$refs.mail.clientWidth/1.01, self.$refs.mail.clientHeight/1.25,
    {
      roughness: 3,
      fill: 'rgba(255, 0, 0, 0.5)',
      // stroke: 'red',
      hachureAngle: 30, // angle of hachure,
      hachureGap: 5,
      fillWeight: 1.5,
    }
  );
};
