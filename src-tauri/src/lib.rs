mod commands;
mod models;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::screen::get_screen_bounds,
            commands::screen::get_usable_screen_bounds,
            commands::window::move_pet_window,
            commands::window::get_pet_window_position
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}