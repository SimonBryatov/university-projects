        module.exports = (clientEntry, socket, io, onSuccess) => {
            if (clientEntry) {
                if (clientEntry.clientKey === socket.clientKey) {
                console.log("Authorized client with id: " + data.id);
                onSuccess();
                } else {
                  console.log("Declined connection with id: " + data.id);
                  io.to(socket.id).emit('Error', "Error! Not Authorized")
                };
        }
    }