use tauri::{AppHandle, LogicalPosition, Manager};

#[tauri::command]
pub fn move_pet_window(
    app: AppHandle,
    x: f64,
    y: f64,
) -> Result<(), String> {
    let window = app
        .get_webview_window("pet")
        .ok_or_else(|| "Pet window not found".to_string())?;

    window
        .set_position(LogicalPosition::new(x, y))
        .map_err(|error| error.to_string())
}