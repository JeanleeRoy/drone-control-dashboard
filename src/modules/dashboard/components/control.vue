<script lang="ts" setup>
import { computed } from "vue";
import { ref } from "vue";

const emit = defineEmits(["command"]);

const active = ref(false);

const nextState = computed(() => (!active.value ? "On" : "Off"));

const hadleActiveState = () => {
  active.value = !active.value;
  emit("command", active.value ? "On" : "Off");
};

const handleCommand = (command: string) => {
  if (active.value) emit("command", command);
};
</script>

<template>
  <div id="remote-control">
    <button class="button top" @click="handleCommand('Up')" href="#">
      <i class="icon-play">Up</i>
    </button>
    <button class="button right" @click="handleCommand('Right')" href="#">
      <i class="icon-forward">Right</i>
    </button>
    <button class="button left" @click="handleCommand('Left')" href="#">
      <i class="icon-backward">Left</i>
    </button>
    <button class="button bottom" @click="handleCommand('Down')" href="#">
      <i class="icon-pause">Down</i>
    </button>
    <button class="center-button" :class="active ? 'bg-black' : 'bg-red-900'" @click="hadleActiveState" href="#">
      <i class="icon-stop">{{ nextState }}</i>
    </button>
  </div>
</template>

<style scoped>
#remote-control {
  width: 400px;
  max-width: 100%;
  aspect-ratio: 1 / 1;
  background: #3a3a3c;
  border-radius: 50%;
  padding: 20px;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
  box-shadow: inset -12px 0 12px -6px #000, inset 12px 0 12px -6px #000,
    inset 0 0 0 12px #000, inset 2px 0 4px 12px rgba(0, 0, 0, 0.4),
    1px 0 4px rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  position: relative;
  margin: 10px auto;
}

#remote-control .center-button {
  display: block;
  height: 38%;
  width: 38%;
  position: absolute;
  top: 31%;
  left: 31%;
  border-radius: 50%;
  box-shadow: 1px 0 4px rgba(0, 0, 0, 0.8);
}

#remote-control .button {
  display: block;
  width: 46%;
  height: 46%;
  margin: 2%;
  position: relative;
  float: left;
  box-shadow: 1px 0px 3px 1px rgba(0, 0, 0, 0.4), inset 0 0 0 1px #000;
}

#remote-control .button:focus {
  background-color: #3a3a3c;
}

#remote-control .button::after {
  content: "";
  display: block;
  width: 50%;
  height: 50%;
  background: #3a3a3c;
  position: absolute;
  border-radius: inherit;
}

#remote-control .button.top {
  border-radius: 100% 0 0 0;
  background: -webkit-radial-gradient(
    bottom right,
    ellipse farthest-corner,
    #000 35%,
    #eee 75%
  );
  background: radial-gradient(bottom right, ellipse farthest-corner, #000 35%, #eee 75%);
}

#remote-control .button.top::after {
  bottom: 0;
  right: 0;
  box-shadow: inset 2px 1px 2px 0 rgba(0, 0, 0, 0.4), 10px 10px 0 10px #3a3a3c;
  -webkit-transform: skew(-3deg, -3deg) scale(0.96);
  -moz-transform: skew(-3deg, -3deg) scale(0.96);
  transform: skew(-3deg, -3deg) scale(0.96);
}

#remote-control .button.right {
  border-radius: 0 100% 0 0;
}

#remote-control .button.right::after {
  bottom: 0;
  left: 0;
  box-shadow: inset -2px 3px 2px -2px rgba(0, 0, 0, 0.4),
    -10px 10px 0 10px #3a3a3c;
  -webkit-transform: skew(3deg, 3deg) scale(0.96);
  -moz-transform: skew(3deg, 3deg) scale(0.96);
  transform: skew(3deg, 3deg) scale(0.96);
}

#remote-control .button.left {
  border-radius: 0 0 0 100%;
  background: -webkit-radial-gradient(
    top right,
    ellipse farthest-corner,
    #000 35%,
    #eee 75%
  );
  background: radial-gradient(top right, ellipse farthest-corner, #000 35%, #eee 75%);
}

#remote-control .button.left::after {
  top: 0;
  right: 0;
  box-shadow: inset 2px -1px 2px 0 rgba(0, 0, 0, 0.4), 10px -10px 0 10px #3a3a3c;
  -webkit-transform: skew(3deg, 3deg) scale(0.96);
  -moz-transform: skew(3deg, 3deg) scale(0.96);
  transform: skew(3deg, 3deg) scale(0.96);
}

#remote-control .button.bottom {
  border-radius: 0 0 100% 0;
  background: -webkit-radial-gradient(
    top left,
    ellipse farthest-corner,
    #000 35%,
    #eee 75%
  );
  background: radial-gradient(top left, ellipse farthest-corner, #000 35%, #eee 75%);
}

#remote-control .button.bottom::after {
  top: 0;
  left: 0;
  box-shadow: inset -2px -3px 2px -2px rgba(0, 0, 0, 0.4),
    -10px -10px 0 10px #3a3a3c;
  -webkit-transform: skew(-3deg, -3deg) scale(0.96);
  -moz-transform: skew(-3deg, -3deg) scale(0.96);
  transform: skew(-3deg, -3deg) scale(0.96);
}

i {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg) translateX(-50%) translateY(-50%);
  position: absolute;
  font-size: 15px;
  top: 50%;
  left: 50%;
  color: rgb(186, 186, 186);
  font-style: normal;
}

@media (min-width: 475px) {
  i {
    font-size: 22px;
  }
}

.top i {
  top: 40%;
}

.left i {
  top: 41%;
}

.right i {
  top: 35%;
}

.bottom i {
  top: 39%;
}

.center-button i {
  top: 42%;
  left: 57%;
}
</style>
