import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// 🔧 TODO: 여기에 너의 Supabase 값 넣기
const SUPABASE_URL = "https://xtopvoxmayqmavryslbo.supabase.co";
const SUPABASE_ANON_KEY = "Dbs30519**";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 기본 트리 ID (일단 1로 고정)
const TREE_ID = 1;

const addBtn = document.getElementById("add-message-btn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const sendBtn = document.getElementById("send-btn");
const messageInput = document.getElementById("message-input");
const messagesList = document.getElementById("messages-list");

// 모달 열기
addBtn.onclick = () => modal.classList.remove("hidden");

// 모달 닫기
closeModal.onclick = () => modal.classList.add("hidden");

// 메시지 전송
sendBtn.onclick = async () => {
  const text = messageInput.value.trim();
  if (!text) return;

  await supabase
    .from("messages")
    .insert({ tree_id: TREE_ID, message: text });

  messageInput.value = "";
  modal.classList.add("hidden");
  loadMessages();
};

// 메시지 불러오기
async function loadMessages() {
  const { data } = await supabase
    .from("messages")
    .select("*")
    .eq("tree_id", TREE_ID)
    .order("created_at", { ascending: false });

  messagesList.innerHTML = "";

  data.forEach(row => {
    const li = document.createElement("li");
    li.textContent = row.message;
    messagesList.appendChild(li);
  });
}

// 초기 로드
loadMessages();
