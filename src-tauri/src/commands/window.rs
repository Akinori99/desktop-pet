use tauri::{AppHandle, LogicalPosition, Manager};

use crate::models::position::Position;

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

#[tauri::command]
pub fn get_pet_window_position(
    app: AppHandle,
) -> Result<Position, String> {
    let window = app
        .get_webview_window("pet")
        .ok_or_else(|| "Pet window not found".to_string())?;

    let position = window
        .outer_position()
        .map_err(|error| error.to_string())?;

    Ok(Position {
        x: position.x as f64,
        y: position.y as f64,
    })
}