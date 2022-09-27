const draggable = ($target) => {
    if (!isMoveable) {
        let isPress = false;
        let prevPosX = 0;
        let prevPosY = 0;

        $target.onmousedown = start;
        $target.onmouseup = end;

        window.onmousemove = move;

        function start(event) {
            prevPosX = event.clientX;
            prevPosY = event.clientY;

            isPress = true;
        }

        function move(event) {
            if (!isPress)
                return;

            const posX = prevPosX - event.clientX;
            const posY = prevPosY - event.clientY;

            prevPosX = event.clientX;
            prevPosY = event.clientY;

            $target.style.left = ($target.offsetLeft - posX) + "px";
            $target.style.top = ($target.offsetTop - posY) + "px";
        }

        function end() {
            isPress = false;
        }
    }
}



window.onload = () => {
    const $target = document.querySelector("canvas");

    draggable($target);
}