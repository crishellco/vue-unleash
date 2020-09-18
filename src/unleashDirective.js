export default function (el, binding, vnode) {
  const isGranted = vnode.context.$store.state.unleash.enabledFeatures[binding.value];
  
  if (!isGranted) {
    const comment = document.createComment(' ');

    Object.defineProperty(comment, 'setAttribute', {
      value: () => undefined,
    });

    vnode.elm = comment;
    vnode.text = ' ';
    vnode.isComment = true;
    vnode.context = undefined;
    vnode.tag = undefined;
    vnode.data.directives = undefined;

    if (vnode.componentInstance) {
      vnode.componentInstance.$el = comment;
    }

    if (el.parentNode) {
      el.parentNode.replaceChild(comment, el);
    }
  }
}