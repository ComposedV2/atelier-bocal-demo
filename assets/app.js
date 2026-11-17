// SITE DE DÉMONSTRATION — configuration FICTIVE.
// Le projet Supabase « demofauxprojet000000 » n'existe pas et la clé ci-dessous est fabriquée :
// sa signature est fausse, elle ne fonctionne nulle part. Aucune requête n'est envoyée à Supabase.
const SUPABASE_URL = "https://demofauxprojet000000.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbW9mYXV4cHJvamV0MDAwMDAwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyMjU2MDAsImV4cCI6MjA4Mjc1ODQwMCwiZGVtbyI6ImNsZS1maWN0aXZlLW5vbi12YWxpZGUifQ.FAUSSE-SIGNATURE-DEMO-cette-cle-ne-fonctionne-nulle-part";

window.demoConfig = { supabaseUrl: SUPABASE_URL, supabaseAnonKey: SUPABASE_ANON_KEY };

// Ouverture / fermeture du faux widget de discussion.
document.getElementById("chat-bubble").addEventListener("click", function () {
  var panel = document.getElementById("chat-panel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
});
