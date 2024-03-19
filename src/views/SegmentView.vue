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
                          内存分段
                        </h3>
                        <p class="section-intro">
                          曾经的一种做法如上图所示：每个应用的地址空间大小限制为一个固定的常数 bound ，也即每个应用的可用虚拟地址区间均为 [0,bound)。随后，就可以以这个大小为单位，将物理内存除了内核预留空间之外的部分划分为若干个大小相同的 插槽 (Slot) ，每个应用的所有数据都被内核放置在其中一个插槽中，对应于物理内存上的一段连续物理地址区间，假设其起始物理地址为 base，则由于二者大小相同，这个区间实际为 [base,base+bound)。
                        </p>
                      </div>
                    </div>
                    <div class="section-media">
                      <img src="@/assets/simple-base-bound.png">
                    </div>  
                  </div>
                </div>
                <div class="section-card">
                  <div class="section-card-content section-rounded">
                    <div class="section-copy">
                      <div class="section-group">
                        <h3 class="section-headline">
                          内存分段
                        </h3>
                        <p class="section-intro">
                          内核开始以更细的粒度，也就是应用地址空间中的一个逻辑段作为单位来安排应用的数据在物理内存中的布局。对于每个段来说，从它在某个应用地址空间中的虚拟地址到它被实际存放在内存中的物理地址中间都要经过一个不同的线性映射，于是 MMU 需要用一对不同的 base/bound
 进行区分。这里由于每个段的大小都是不同的，我们也不再能仅仅使用一个 bound进行简化。当任务切换的时候，这些对寄存器也需要被切换。
                        </p>
                      </div>
                    </div>
                    <div class="section-media">
                      <img src="@/assets/segmentation.png">
                    </div>  
                  </div>
                </div>
              </div>
            </div>
          </div>
    </section>
    <section class="section-connect-6 section-card-view section-grey section-spacers">
          <div class="sticky-wrapper">
            <div class="sticky-content">
              <div class="section-wrapper">
                <div class="section-card">
                  <div class="section-card-content section-rounded">
                    <div class="section-copy">
                      <div class="section-group">
                        <h3 class="section-headline">
                          内存分页
                        </h3>
                        <p class="section-intro">
                          如上图所示，内核以页为单位进行物理内存管理。每个应用的地址空间可以被分成若干个（虚拟） 页面 (Page) ，而可用的物理内存也同样可以被分成若干个（物理） 页帧 (Frame) ，虚拟页面和物理页帧的大小相同。每个虚拟页面中的数据实际上都存储在某个物理页帧上。相比分段内存管理，分页内存管理的粒度更小且大小固定，应用地址空间中的每个逻辑段都由多个虚拟页面组成。而且每个虚拟页面在地址转换的过程中都使用与运行的应用绑定的不同的线性映射，而不像分段内存管理那样每个逻辑段都使用一个相同的线性映射。
                        </p>
                      </div>
                    </div>
                    <div class="section-media">
                      <img src="@/assets/page-table.png">
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
    console.log("cardsNumber", cardsNumber);
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
        console.log("index", index);
        const startTrigger = stickyTop - cardScroll * (index - 1);
        gsap.to(cards[index -1], {
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
            console.log(index);
            cards[index].classList.add("animated");
            console.log(index);
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