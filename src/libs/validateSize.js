function validateSize(size, mb = 5) {
    const maxSizeInBytes = mb * 1024 * 1024; // 5 MB
    if (size > maxSizeInBytes) {
        return false;
    }
    return true;
}

export default validateSize;