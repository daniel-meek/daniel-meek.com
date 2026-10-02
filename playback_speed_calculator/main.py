import sys

def parse_time(time_str):
    #Converts a time string (HH:MM:SS or MM:SS) into total seconds.
    parts = time_str.split(':')
    parts = [int(p) for p in parts]
    
    if len(parts) == 3:
        return parts[0] * 3600 + parts[1] * 60 + parts[2]
    elif len(parts) == 2:
        return parts[0] * 60 + parts[1]
    else:
        raise ValueError("Time must be in HH:MM:SS or MM:SS format.")

def format_time(total_seconds):
    #Converts total seconds back into HH:MM:SS or MM:SS format.
    total_seconds = round(total_seconds)
    hours = total_seconds // 3600
    minutes = (total_seconds % 3600) // 60
    seconds = total_seconds % 60
    
    if hours > 0:
        return f"{hours}:{minutes:02d}:{seconds:02d}"
    else:
        return f"{minutes}:{seconds:02d}"

def main():
    # Check if the correct number of arguments are provided
    if len(sys.argv) != 3:
        print("Usage: python playback_calculator.py <time> <speed>")
        print("Example: python playback_calculator.py 2:10:00 1.5")
        sys.exit(1)

    time_str = sys.argv[1]
    
    # Parse the playback speed
    try:
        speed = float(sys.argv[2])
        if speed <= 0:
            raise ValueError("Speed must be greater than 0.")
    except ValueError as e:
        print(f"Error: Invalid speed. {e}")
        sys.exit(1)

    # Parse the input time
    try:
        original_seconds = parse_time(time_str)
    except ValueError as e:
        print(f"Error: {e}")
        sys.exit(1)

    # Calculate new time and time saved
    new_seconds = original_seconds / speed
    saved_seconds = original_seconds - new_seconds

    # Format the results
    new_time_str = format_time(new_seconds)
    saved_time_str = format_time(saved_seconds)

    # Output the exact requested format
    print(f"new time: {new_time_str} | time saved: {saved_time_str}")

if __name__ == "__main__":
    main()