
        
        if (!localStorage.getItem('reloaded')) {
            
            setTimeout(() => {
                localStorage.setItem('reloaded', 'true'); 
                location.reload();
            }, 1000); 
        }

Vue.config.devtools = true;

        Vue.component('cardnew', {
          template: `
            <div class="cardnew-wrap"
              @mousemove="handleMouseMove"
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              ref="cardnew">
              <div class="cardnew" :style="cardStyle">
                <div class="cardnew-bg" :style="[cardBgTransform, cardBgImage]"></div>
                <div class="cardnew-info">
                  <slot name="header"></slot>
                  <slot name="content"></slot>
                </div>
              </div>
            </div>`,
          props: ['dataImage'],
          data() {
            return {
              width: 0,
              height: 0,
              mouseX: 0,
              mouseY: 0,
              mouseLeaveDelay: null
            };
          },
          computed: {
            mousePX() {
              return this.mouseX / this.width;
            },
            mousePY() {
              return this.mouseY / this.height;
            },
            cardStyle() {
              const rX = this.mousePX * 30;
              const rY = this.mousePY * -30;
              return {
                transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
              };
            },
            cardBgTransform() {
              const tX = this.mousePX * -40;
              const tY = this.mousePY * -40;
              return {
                transform: `translateX(${tX}px) translateY(${tY}px)`
              };
            },
            cardBgImage() {
              return {
                backgroundImage: `url(${this.dataImage})`
              };
            }
          },
          methods: {
            calculateCardDimensions() {
              this.width = this.$refs.cardnew.offsetWidth || 0;
              this.height = this.$refs.cardnew.offsetHeight || 0;
            },
            handleMouseMove(e) {
              const rect = this.$refs.cardnew.getBoundingClientRect();
              this.mouseX = e.clientX - rect.left - this.width / 2;
              this.mouseY = e.clientY - rect.top - this.height / 2;
            },
            handleMouseEnter() {
              clearTimeout(this.mouseLeaveDelay);
            },
            handleMouseLeave() {
              this.mouseLeaveDelay = setTimeout(() => {
                this.mouseX = 0;
                this.mouseY = 0;
              }, 1000);
            }
          },
          mounted() {
            this.calculateCardDimensions();
            window.addEventListener('resize', this.calculateCardDimensions);
          },
          beforeDestroy() {
            window.removeEventListener('resize', this.calculateCardDimensions);
          }
        });

        new Vue({
          el: '#app'
        });