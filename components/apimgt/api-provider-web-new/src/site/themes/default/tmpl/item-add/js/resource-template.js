var addResourcesToApi = function () {
    $('#resourceTableError').hide('fast');
    $('#resourceRow').clone(true).attr('id', 'item-' + resourcesCount).insertAfter($('#resourceRow'));
    $('#item-' + resourcesCount + ' #resourceMethod').val($('#resourceMethod').val());
    $('#item-' + resourcesCount + ' #uriTemplate').attr('disabled', 'disabled');
    $('#item-' + resourcesCount + ' #resourceMethod').attr('disabled', 'disabled');
    $('#item-' + resourcesCount + ' td#buttons a#resourceAddBtn').remove();
    if($('#item-' + resourcesCount + ' td#buttons a#resourceDelBtn').length>0){
    $('#item-' + resourcesCount + ' td#buttons a#resourceDelBtn').remove();
    }
    $('#item-' + resourcesCount + ' td#buttons').append("<a class=\"btn btn-danger\" onclick=\"deleteResource(" + resourcesCount + ")\"><i class=\"icon-trash icon-white\"></i> Delete</a>");


    $('<input>').attr('type', 'hidden')
        .attr('name', 'resourceMethod-' + resourcesCount).attr('value', $('#resourceMethod').val())
        .appendTo('#addAPIForm');

    $('<input>').attr('type', 'hidden')
        .attr('name', 'uriTemplate-' + resourcesCount).attr('value', $('#uriTemplate').val())
        .appendTo('#addAPIForm');
    rowNums.push(resourcesCount);
    resourcesCount++;

    if ($('#resourceCount').length == 0) {
        $('<input>').attr('type', 'hidden')
            .attr('name', 'resourceCount')
            .attr('id', 'resourceCount')
            .attr('value', rowNums)
            .appendTo('#addAPIForm');
    } else {
        $('#resourceCount').attr('value', rowNums);
    }

    $('#uriTemplate').val('');
    $('#resourceMethod').val('GET');

};


var deleteResource = function (id) {
    var count=$('#resourceTable tr').length;
    //Check whether only one defined resource remains before delete operation
    if(count==3){
        $('#resourceTableError').show('fast');
        return;
    }
    $('#resourceTableError').hide('fast');
    $('#item-' + id).remove();
    $('[name=resourceMethod-' + id + ']').remove();
    $('[name=uriTemplate-' + id + ']').remove();
    rowNums.splice(rowNums.indexOf(id),1);
    $('#resourceCount').val(rowNums);

};