// ===============================
// Supabase 연결 설정
// ===============================
const SUPABASE_URL = "https://xtopvoxmayqmavryslbo.supabase.co";  // 네 프로젝트 URL
const SUPABASE_ANON_KEY = "Dbs30519**";                   // 절대 service_role 넣지 말기

// v2 방식
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// ===============================
// 메시지 전송 함수
// ===============================
async function submitMessage() {
  const textarea = document.getElementById("message");
  const message = textarea.value.trim();

  if (message.length === 0) return;

  const { data, error } = await supabaseClient
    .from("messages")
    .insert([{ text: message }]);   // text 컬럼에 맞춰 삽입

  if (error) {
    console.error("Insert Error:", error);
    alert("메시지 저장 실패: " + error.message);
    return;
  }

  textarea.value = "";
  loadMessages();
}


// ===============================
// 메시지 불러오기 함수
// ===============================
async function loadMessages() {
  const list = document.getElementById("messages");

  const { data, error } = await supabaseClient
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Load Error:", error);
    return;
  }

  list.innerHTML = "";

  data.forEach((msg) => {
    const li = document.createElement("li");
    li.textContent = msg.text;
    list.appendChild(li);
  });
}


// 첫 실행 시 메시지 불러오기
window.onload = () => {
  loadMessages();
};
