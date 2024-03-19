<template >
  <div class="content">
    <div class="main magic-os">
    <section class="section-connect-6 section-card-view section-grey section-spacers">
          <div class="sticky-wrapper">
            <div class="sticky-content">
              <div class="section-wrapper">
                <div class="section-card">
                  <div class="section-card-content section-rounded">
                    <div class="section-copy">
                      <div class="section-group">
                        <h3 class="section-headline">
                          精彩全收藏
                          <br />
                          兴趣永在线
                        </h3>
                        <p class="section-intro">
                          告诉你一个节省流量的妙招：
                          <br />
                          现在网页也能离线保存了。
                          <br />
                          把你的知识、视频永久收藏保存，
                          <br />
                          不论设备离线在线，
                          <br />
                          让你感兴趣的内容始终在线2。
                        </p>
                      </div>
                    </div>  
                  </div>
                </div>
                <div class="section-card">
                  <div class="section-card-content section-rounded">
                    <div class="section-copy">
                      <div class="section-group">
                        <h3 class="section-headline">
                          知音笔记
                          <br />
                          一触即达
                        </h3>
                        <p class="section-intro">
                          录音关联笔记，点击笔记，
                          <br />
                          自动跳转到相应的录音片段。
                          <br />
                          回顾会议、复习课程、随心批注更高效。
                        </p>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  </div>
  </div>
  
  
</template>
<script>
import { onMounted } from "vue";
export default {
  setup() {
    onMounted(() => {
      cardViewFn();
    });
  },
};
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const screenWidth = document.documentElement.clientWidth,
  screenHeight = document.documentElement.clientHeight;
const stickyNavHeight = 65;

const stickyCenter = (stickyEl, wrapper) => {
  const bodyHeight = wrapper.offsetHeight,
    center = (screenHeight - stickyNavHeight - bodyHeight) / 2,
    top = center > 0 ? center + stickyNavHeight : stickyNavHeight;

  stickyEl.style.top = top + "px";
  stickyEl.setAttribute("data-top", top);
};
const cardViewFn = () => {
  const sections = document.querySelectorAll(".section-card-view");

  sections.forEach((section) => {
    const stickyWrapper = section.querySelector(".sticky-wrapper"),
      stickyContent = section.querySelector(".sticky-content"),
      wrapper = section.querySelector(".section-wrapper"),
      // headline = section.querySelector(".section-main-headline") || null,
      cards = wrapper.querySelectorAll(".section-card"),
      // cardsXS = wrapper.querySelectorAll(".section-card-xs"),
      cardsNumber = cards.length,
      cardWidth = cards[0].clientWidth,
      cardMargin = Number(window.getComputedStyle(cards[1]).getPropertyValue("margin-left").slice(0, -2)),
      cardScroll = cardWidth + cardMargin,
      swiperOffset =
        wrapper.getBoundingClientRect().left * 2 +
        cardWidth * cardsNumber +
        cardMargin * (cardsNumber - 1) -
        screenWidth;

    // pc端
    stickyCenter(stickyContent, stickyContent);
    const stickyTop = Number(stickyContent.getAttribute("data-top"));

    ScrollTrigger.create({
      trigger: cards[0],
      start: "bottom bottom",
      end: "bottom bottom",
      // markers: true,
      onEnter: function () {
        cards[0].classList.add("animated");
      },
    });

    gsap.to(wrapper, {
      scrollTrigger: {
        trigger: stickyWrapper,
        start: "top " + stickyNavHeight,
        end: "bottom 100%",
        scrub: 0,
      },
      ease: "none",
      x: -swiperOffset,
    });

    cards.forEach(function (card, index) {
      if (index > 0) {
        const startTrigger = stickyTop - cardScroll * (index - 1);

        gsap.to(cards[index - 1], {
          scrollTrigger: {
            trigger: stickyWrapper,
            start: "top " + (stickyTop - cardWidth * index + cardWidth * 0.5),
            end: "+=" + cardWidth * 0.5,
            scrub: 0,
          },
          x: -(screenWidth - cardWidth) / 2,
        });

        gsap.to(card.querySelector(".section-card-content"), {
          scrollTrigger: {
            trigger: card,
            start: "top " + startTrigger,
            end: "+=" + cardScroll / 3,
            scrub: 0,
            // markers: {indent: 100 * index},
          },
          ease: "none",
          filter: "blur(0px)",
          scale: 1,
        });

        ScrollTrigger.create({
          trigger: card,
          start: "top " + (startTrigger - cardWidth * 0.8),
          end: "bottom bottom",
          // markers: true,
          onEnter: function () {
            card.classList.add("animated");
          },
        });

        ScrollTrigger.create({
          trigger: card,
          start: "top " + startTrigger,
          end: "bottom bottom",
          // markers: true,
          onEnterBack: function () {
            card.classList.remove("animated");
          },
        });
      }
    });
  });
};
</script>
<style lang="scss" scoped>
@import './index';
</style>