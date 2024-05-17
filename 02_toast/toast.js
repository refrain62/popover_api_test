const button = document.getElementById("button");

// クリック時のイベント
button.addEventListener("click", () => {
  // ランダムに表示させる内容を生成
  const content = 
    Math.random() > 0.5
      ? { message: "Success!", cssName: "success" }
      : { message: "Error!", cssName: "error" };

   setupToast(content);
});

// トーストの準備
const setupToast = ({ message, cssName }) => {
  // トーストをDOMに追加
  const toast = createToastElm(message, cssName);
  document.body.appendChild(toast);

  // showPopoverメソッドで表示
  toast.showPopover();

  // setTimeoutで3秒たったらトーストを消す
  const timer = setTimeout(() => removeToast(toast), 3000);

  // timeoutを解除するためのtimerをdataset要素として設定
  toast.dataset.timer = timer;

  // トーストの表示と非表示時に並び替え
  toast.addEventListener("toggle", (event) => {
    alignToast(event.newState === "closed");
  });
};

/**
 * トーストを作成します。
 * @param {string} message 表示するメッセージ
 * @param {string} cssName cssのクラス名
 * @return {HTMLDivElement} 作成したトーストエレメント
 */
const createToastElm = (message, cssName) => {
  const toast = document.createElement("div");
  toast.popover = "manual";
  toast.classList.add("toast", cssName);

  // コンテンツ
  const content = document.createElement("p");
  content.textContent = message;
  content.classList.add("toast-content");
  toast.appendChild(content);

  // 閉じるボタン
  const closeButton = document.createElement("button");
  closeButton.classList.add("toast-button");
  closeButton.addEventListener("click", () => removeToast(toast));
  toast.appendChild(closeButton);

  return toast;
}

/**
 * トーストを並べる
 * @param {*} withMoveAnim true: opacity & translateアニメーション、false: opacity アニメーション
 */
const alignToast = (withMoveAnim) => {
  const toasts = document.querySelectorAll(".toast");

  // トーストを縦に並べる
  toasts.forEach((toast, index) => {
    toast.style.transition = withMoveAnim
      ? "translate 0.2s linear, "
      : ""
      + "opacity 0.2s linear";
    
    toast.style.translate = `0px ${(56 + 10) * index}px`;
    toast.style.opacity = 1;
  });
};

/**
 * トーストの削除
 * @param {*} toast 削除したいトースト
 */
const removeToast = (toast) => {
  // 非表示にする
  toast.hidePopover();
  // 非表示後にDOMから削除
  toast.remove();
  // setTimeoutを削除
  clearTimeout(toast.dataset.timer);
};

