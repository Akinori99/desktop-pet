use tauri::AppHandle;

use crate::models::screen_bounds::ScreenBounds;

#[tauri::command]
pub fn get_screen_bounds(app: AppHandle) -> Result<ScreenBounds, String> {
    let monitor = app
        .primary_monitor()
        .map_err(|error| error.to_string())?
        .ok_or_else(|| "Primary monitor not found".to_string())?;

    let position = monitor.position();
    let size = monitor.size();

    Ok(ScreenBounds {
        x: position.x as f64,
        y: position.y as f64,
        width: size.width as f64,
        height: size.height as f64,
    })
}